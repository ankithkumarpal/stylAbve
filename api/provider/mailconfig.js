const nodemailer = require("nodemailer");
const User = require("../models/Users");
const Product = require("../models/Product");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

const sendOtpEmail = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: "Verify Your Identity - Unique Carving OTP",
    text: `Hello ${name},

We received a request to access your account at Unique Carving. To verify your identity, please use the One-Time Password (OTP) below:

Your OTP: ${otp}

This code is valid for 10 minutes. Please do not share it with anyone.

If you didn't request this, please disregard this email. Your account's security is our top priority.

Thank you for being a valued member of Unique Carving.

Warm Regards,
The Unique Carving Support Team`,
  };

  try {
    console.log("reached here")
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};

const sendOrderConfirmationEmail = async (order) => {
  try {
    const user = await User.findById(order.userId);
    const userEmail = user.email;

    const productDetails = await Product.find({
      _id: { $in: order.productDetails.map((detail) => detail.productId) },
    }).populate("imageIds");

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    let productImages = [];
    let productHtml = "";

    console.log(order);

    productDetails.forEach((product, index) => {
      const imgId = `productImg${index}`;
      const imageUrl = `${baseUrl}/api/product/image/${product.imageIds[0].filename}`;

      productImages.push({
        filename: product.imageIds[0].filename,
        path: imageUrl, 
        cid: imgId,
      });


      productHtml += `
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="cid:${imgId}" alt="${product.productType
        }" style="width: 100px; height: auto; margin-right: 20px;" />
        <div>
          <h3>${product.productType}</h3>
          <p>Price: ${product.price}</p>
          <p>Quantity: ${order.productDetails.find(
          (detail) => detail.productId === product._id.toString()
        ).quantity
        }</p>
        </div>
      </div>
    `;
    });

    const mailOptions = {
      from: process.env.Email,
      to: [userEmail, process.env.Email],
      subject: "Order Confirmation - Unique Carving",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
          <!-- Header Section -->
          <div style="background-color: #4CAF50; color: #fff; padding: 20px; border-radius: 8px;">
            <h1>Order Confirmation</h1>
            <p>Hello ${user.name},</p>
            <p>Thank you for your order! We're excited to let you know that we have received your order and are currently processing it.</p>
          </div>
          
        <!-- Order Details Section -->
        <div style="background-color: #F9FBE7; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #4CAF50; margin-bottom: 10px; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; font-size: 24px;">Order Details</h2>
          ${productHtml}
        </div>
          <!-- Shipping Address Section -->
          <div style="background-color: #E9F4FF; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007BFF; margin-bottom: 10px; border-bottom: 1px solid #007BFF; padding-bottom: 5px;">Shipping Address</h3>
            <p>
              ${order.address.doorno}, ${order.address.area},<br/>
              ${order.address.landmark}, ${order.address.pincode}, ${order.address.country}
            </p>
            <p style="margin: 20px 0; font-size: 16px; text-align: center;">
  <strong style="background-color: #4CAF50; color: #fff; font-weight: bolder; padding: 10px 15px; border-radius: 5px; box-sizing: border-box; display: inline-block;">
    Total Amount: ${order.amount}
  </strong>
</p>


            </div>

           <!-- Visit Us Section -->
          <div style="background-color: #E3F2FD; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007BFF; margin-bottom: 10px; border-bottom: 1px solid #007BFF; padding-bottom: 5px;">Visit Us</h3>
            <p>We invite you to explore more of our products and updates on our website: <a href="https://uniquecarving.in/" style="color: #007BFF;">Style Above</a>.</p>
          </div>
    
          <!-- Thank You Section -->
          <div style="background-color: #4CAF50;  padding: 20px; margin-top: 20px; border-radius: 8px; color: #fff;">
            <p>Thank you for choosing Unique Carving!</p>
            <p>Warm Regards,<br />The Unique Carving Team</p>
          </div>
          
          <!-- Need Assistance Section -->
          <div style="background-color: #FFF3E0; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #FF5722; margin-bottom: 10px; border-bottom: 1px solid #FF5722; padding-bottom: 5px;">Need Assistance?</h3>
            <p>If you have any queries, please don't hesitate to contact us at <a href="mailto:uniquecarving@gmail.com" style="color: #FF5722;">uniquecarving@gmail.com</a>.</p>
          </div>
        </div>
      `,
      attachments: productImages,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
};

const sendPencilCarvedOrderConfirmationEmail = async (order) => {
  try {
    const user = await User.findById(order.userId);
    const userEmail = user.email;

    const productDetails = await Product.find({
      _id: { $in: order.productDetails.map((detail) => detail.productId) },
    }).populate("imageIds");

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    let productImages = [];
    let productHtml = "";

    productDetails.forEach((product, index) => {
      const imgId = `productImg${index}`;
      const imageUrl = `${baseUrl}/api/product/image/${product.imageIds[0].filename}`;

      productImages.push({
        filename: product.imageIds[0].filename,
        path: imageUrl,
        cid: imgId,
      });

      productHtml += `
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="cid:${imgId}" alt="${product.productType
        }" style="width: 100px; height: auto; margin-right: 20px;" />
      </div>
    `;
    });

    let singleNameHtml = `<h3>Single Names:</h3>`;
    order.singleName.forEach((item) => {
      singleNameHtml += `<p>ID: ${item.id}, Name: ${item.name}</p>`;
    });

    let pairNameHtml = `<h3>Pair Names:</h3>`;
    order.pairName.forEach((pair) => {
      pairNameHtml += `<p>Pair ID: ${pair.pairId}, Names: ${pair.names.join(" and ")}</p>`;
    });

    let instructionHtml = `<h3>Special Instructions:</h3><p>${order.instruction}</p>`;

    const mailOptions = {
      from: process.env.Email,
      to: [userEmail, process.env.Email],
      subject: "Order Confirmation - Unique Carving",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
          <div style="background-color: #4CAF50; color: #fff; padding: 20px; border-radius: 8px;">
            <h1>Order Confirmation</h1>
            <p>Hello ${user.name},</p>
            <p>Thank you for your order! We're excited to let you know that we have received your order and are currently processing it.</p>
          </div>

          <div style="background-color: #F9FBE7; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #4CAF50; margin-bottom: 10px; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; font-size: 24px;">Order Details</h2>
            ${productHtml}
            ${singleNameHtml}
            ${pairNameHtml}
            ${instructionHtml}
          </div>

          <div style="background-color: #E9F4FF; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007BFF; margin-bottom: 10px; border-bottom: 1px solid #007BFF; padding-bottom: 5px;">Shipping Address</h3>
            <p>
              ${order.address.doorno}, ${order.address.area},<br/>
              ${order.address.landmark}, ${order.address.pincode}, ${order.address.country}
            </p>
            <p style="margin: 20px 0; font-size: 16px; text-align: center;">
              <strong style="background-color: #4CAF50; color: #fff; font-weight: bolder; padding: 10px 15px; border-radius: 5px; box-sizing: border-box; display: inline-block;">
                Total Amount: ${order.amount}
              </strong>
            </p>
          </div>

          <div style="background-color: #E3F2FD; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007BFF; margin-bottom: 10px; border-bottom: 1px solid #007BFF; padding-bottom: 5px;">Visit Us</h3>
            <p>We invite you to explore more of our products and updates on our website: <a href="https://uniquecarving.in/" style="color: #007BFF;">Style Above</a>.</p>
          </div>

          <div style="background-color: #4CAF50;  padding: 20px; margin-top: 20px; border-radius: 8px; color: #fff;">
            <p>Thank you for choosing Unique Carving!</p>
            <p>Warm Regards,<br />The Unique Carving Team</p>
          </div>

          <div style="background-color: #FFF3E0; padding: 20px; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #FF5722; margin-bottom: 10px; border-bottom: 1px solid #FF5722; padding-bottom: 5px;">Need Assistance?</h3>
            <p>If you have any queries, please don't hesitate to contact us at <a href="mailto:uniquecarving@gmail.com" style="color: #FF5722;">uniquecarving@gmail.com</a>.</p>
          </div>
        </div>
      `,
      attachments: productImages,
    };

    await transporter.sendMail(mailOptions);
    console.log("Pencil-carved item order confirmation email sent successfully");
  } catch (error) {
    console.error("Failed to send pencil-carved item order confirmation email:", error);
  }
};

module.exports = {
  sendOtpEmail,
  sendOrderConfirmationEmail,
  sendPencilCarvedOrderConfirmationEmail,
};
