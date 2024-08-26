const Users = require('../models/Users');
const Address = require('../models/Address');
const Response = require('../provider/requestResponse');
const router = require('express').Router();

router.get('/fetch/profile-setting', async (req, res) => {
    try {
        const id = req.query.id;
        const user = await Users.findById(id).populate('Address');

        if (!user) {
            return res.status(404).json(new Response(success = false , message = "user not found"));
        }

        return res.status(200).json({ 
            success: true, 
            message: 'User profile fetched successfully', 
            data: user 
        });
    } catch (error) {
        return res.status(500).json(new Response(success = false , message = error.message));
    }
});


router.get('/fetch/user-address', async (req, res) => {
    try {
        const id = req.query.id;
        const user = await Users.findById(id).populate('Address');

        if (!user) {
            return res.status(404).json(new Response(success = false , message = "user not found"));
        }

        return res.status(200).json({ 
            success: true, 
            message: 'User address fetched successfully', 
            data: user.Address
        });
    } catch (error) {
        return res.status(500).json(new Response(success = false , message = error.message));
    }
});

router.patch('/update/profile-setting', async (req, res) => {
    try {
        let user = await Users.findById(req.body.id);
        if (!user) {
            return res.status(404).json(new Response(success = true , message = "user not found"));
        }

        user.email = req.body.email;
        user.name = req.body.name;
        user.phone = req.body.phone;

        if (user.Address) {
            let address = await Address.findById(user.Address);
            if (address) {
                address.area = req.body.area;
                address.doorNo = req.body.doorNo;
                address.landmark = req.body.landmark;
                address.pincode = req.body.pincode;
                address.country = req.body.country;
                await address.save();
            } else {
                return res.status(404).json(new Response(success = false , message = "Address not found"));
            }
        } else {
            let newAddress = new Address({
                area: req.body.area,
                doorNo: req.body.doorNo,
                landmark: req.body.landmark,
                pincode: req.body.pincode,
                country: req.body.country
            });
            await newAddress.save();
            user.Address = newAddress._id;
        }

        await user.save();

        return res.status(200).json(new Response(sucess =true, message ="Profile updated successfully" , data = user));
    } catch (error) {
        return res.status(500).json(new Response(sucess = false, message = error, data = null));
    }
});

module.exports = router;
