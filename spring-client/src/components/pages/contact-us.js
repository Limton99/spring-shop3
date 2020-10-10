import React from "react";
import { Carousel, Card } from 'antd';

function onChange(a, b, c) {
    console.log(a, b, c);
}

const ContactPage = () => {

    return (
        <div className="contact-us">

            <section className="my-5">

                <h2 className="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
                <p className="text-center w-responsive mx-auto pb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam
                    eum porro a pariatur veniam.</p>

                <div className="row">

                    <div className="col-lg-5 mb-lg-0 mb-4">

                        <div className="card">
                            <div className="card-body">
                                <div className="form-header blue accent-1">
                                    <h3 className="mt-2">Write to us:</h3>
                                </div>
                                <p className="dark-grey-text">We'll write rarely, but only the best content.</p>
                                <div className="md-form">
                                    <input type="text" id="form-name" className="form-control" />
                                        <label for="form-name">Your name</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="form-email" className="form-control" />
                                        <label className="form-email">Your email</label>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="form-Subject" className="form-control" />
                                        <label for="form-Subject">Subject</label>
                                </div>
                                <div className="md-form">
                                    <textarea id="form-text" className="form-control md-textarea" rows="3" />
                                    <label for="form-text">Send message</label>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-light-blue">Submit</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-7">

                        <div id="map-container-section" className="z-depth-1-half map-container-section mb-4" style={{height: 400}}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7762669187673!2d76.90755611499125!3d43.23515028738107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883692f027581ad%3A0x2426740f56437e63!2z0JzQtdC20LTRg9C90LDRgNC-0LTQvdGL0Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9GFINGC0LXRhdC90L7Qu9C-0LPQuNC5!5e0!3m2!1sru!2sus!4v1586364972382!5m2!1sru!2sus"
                                width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen=""
                                aria-hidden="false" tabIndex="0" />
                        </div>
                        <div className="row text-center">
                            <div className="col-md-4">

                                <p>Zhandosov, st.</p>
                                <p className="mb-md-0">Qazaqstan</p>
                            </div>
                            <div className="col-md-4">

                                <p>+7 777 777 77 77</p>
                                <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
                            </div>
                            <div className="col-md-4">

                                <p>info@gmail.com</p>
                                <p className="mb-0">sale@gmail.com</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default ContactPage;