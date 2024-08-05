import React from 'react';
import './contactus.css';

function Contact() {
    return (
        <>
            <div className="home">
                <div className="contacts">
                    <div className='cont_lefts'>
                        <div className="conatact_information">
                            <h2>Contact Details</h2>
                            <div className="information">
                                <div className="contact_name"><span>Name : Ankith Kumar Pal</span></div>
                                <div className="conatact_no"><span>Contact No : 999999999</span></div>
                                <div className="conatact_email"><span>Email : ankithpal721@gmail.com</span></div>
                                <div className="conatact_address">
                                    <div className="conatact_email"><span>Address : Ankith Kumar Pal</span></div>
                                    <div className="conatact_email"><span>City : Ankith Kumar Pal</span></div>
                                    <div className="conatact_email"><span>State : Ankith Kumar Pal</span></div>
                                    <div className="conatact_email"><span>Pincode : Ankith Kumar Pal</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="followus">
                            <div className='social'>
                                <a href="https://www.instagram.com/ankith_kumar_27" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram-square insta"></i>
                                </a>
                                <span>ankith_kumar_pal</span>
                            </div>
                            <div>
                                <i className="fab fa-whatsapp whatsapp"></i>
                                <span>+91 8309145402</span>
                            </div>
                            <div>
                                <a href="https://www.twitter.com/ankith_pal" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter-square twitter"></i>
                                </a>
                                <span>ankith.721</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
