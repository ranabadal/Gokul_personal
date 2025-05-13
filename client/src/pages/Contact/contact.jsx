import React, { useState } from 'react';
import styles from './contact.module.css';
import AboveHeader from '../../components/above_header/above_header';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SocialConnect from './SocialConnect/socialConnect';
import InputField from '../../components/InputComponent/inputComp';
import Button from '../../components/ButtonNew/button';
import { useToaster } from '../../utils';
import { BASE_URL } from '../../Const/Const';
const Contact = () => {
    const setToast = useToaster();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        mobile: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateMobile = (mobile) => {
        const re = /^[6-9]\d{9}$/; // Ensures mobile number starts with 6-9 and has 10 digits
        return re.test(mobile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, mobile, message } = formData;
        let valid = true;
        const newErrors = { name: '', mobile: '', message: '' };

        if (!name) {
            newErrors.name = 'Please enter your name';
            valid = false;
        }
        if (!mobile) {
            newErrors.mobile = 'Please enter your mobile number';
            valid = false;
        } else if (!validateMobile(mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
            valid = false;
        }
        if (!message) {
            newErrors.message = 'Please enter your message';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        try {
            const url = `${BASE_URL}/api/auth/contact`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, mobile, message }),
            });
            const result = await response.json();
            const { success, message: responseMessage } = result;
            if (success) {
                setToast('Message sent successfully', 'success');
                setFormData({ name: '', mobile: '', message: '' });
            } else {
                setToast(responseMessage);
            }
        } catch (error) {
            console.error(error);
            setToast('Error sending message');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <AboveHeader />
            <Header />
            <div className={styles.mainHeading}>Mero Gokul Welcomes You!</div>
            <div className={styles.contact}>
                <div className={styles.contactText}>
                    <div className={styles.heading}>Contact Us</div>
                    <div className={styles.desc}>Have any questions or concerns? We’re always ready to help!</div>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <InputField
                         icon={null}  
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <InputField
                         icon={null}  
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            error={errors.mobile}
                        />
                        <div className={styles.inputContainer}>
                            <textarea
                                name="message"
                                placeholder="Type your message here"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {errors.message && <div className={styles.error}>{errors.message}</div>}
                        </div>
                        <Button type="submit" text="Submit" />
                    </form>
                </div>
            </div>
            <SocialConnect />
            <Footer />
        </div>
    );
};

export default Contact;