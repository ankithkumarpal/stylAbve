import './contactus.css';
import Navbar from '../../components/navbar/Navbar';
import {Link} from 'react-router-dom';

function Contact() {
    return (
        <>
            <Navbar />
            <div className="homes">
                <div className="contacts">
                    <div className='cont_lefts'>
                    <div className="conatact_information">
                            <h2>contact information </h2>
                            <div className="information">
                            <div className="contact_name"> <span>Name : ankith kumar pal </span></div>
                            <div className="conatact_no"> <span>contact no : 999999999 </span></div>
                            <div className="conatact_email"> <span>Gmail : ankithpal721@gmail.com </span></div>
                            <div className="conatact_address">
                            <div className="conatact_email"> Address : ankith kumar pal </div>
                            <div className="conatact_email"> city  : ankith kumar pal </div>
                           
                             <div className="conatact_email">state : ankith kumar pal </div>
                             <div className="conatact_email">pincode : ankith kumar pal </div>
                            </div>
                            </div>
                        </div>
                        <div className="followus">  
                            <div>
                                {/* <Link > */}
                               <a href="https://www.instagram.com/ankith_kumar_27" target="_blank">
                           <i class="fab fa-instagram-square insta"></i>
                           </a>
                           {/* </Link> */}
                           <span> ankith_kumar_pal</span>
                           </div>
                           <div>
                           <i class="fab fa-whatsapp whatsapp  "></i>
                           <span> 91+ 8309145402</span>
                           </div>
                           <div>
                               <a href="https://www.twitter.com/ankith_pal" target="_blank">
                                  <i class="fab fa-twitter-square twitter"></i>
                            </a>
                            <span> ankith.721</span>
                            </div>
                        </div>
                    </div>
                   

                </div>

            </div>
        </>
    );
}

export default Contact;
