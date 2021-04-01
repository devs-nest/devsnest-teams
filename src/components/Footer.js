import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaLink, FaDiscord, FaLinkedin, FaFacebookSquare, FaInstagramSquare, FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.text}>
                <p>We aim to make young India financially self-sustainable by providing equal opportunity for all.</p>
                <div>
                    <a className={styles.source_code} href="https://github.com/devs-nest/devsnest-teams" target="_blank" rel="noopener noreferrer">
                        <FaGithub />&nbsp;GitHub
                    </a>
                    <a href="https://drive.google.com/file/d/17TKzId-5qlRjKVLX30W1Brn_L70rcMN1/view" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>
            </div>
            <div className={styles.space}></div>
            <div className={styles.connect}>
                <div className={styles.email}>
                    Contact Us: <a href="mailto: support@devsnest.in">support@devsnest.in</a>
                </div>
                <div>
                    <Row link="https://www.devsnest.in">
                        <FaLink size={25} color="darkblue" />
                    </Row>
                    <Row link="https://discord.gg/rGQCswxcx6">
                        <FaDiscord size={25} color="darkblue" />
                    </Row>
                    <Row link="https://www.linkedin.com/company/devsnest/">
                        <FaLinkedin size={25} color="darkblue" />
                    </Row>
                    <Row link="https://www.facebook.com/devsnest/">
                        <FaFacebookSquare size={25} color="darkblue" />
                    </Row>
                    <Row link="https://www.instagram.com/devsnest.in/">
                        <FaInstagramSquare size={25} color="darkblue" />
                    </Row>
                </div>
            </div>
        </div>
    )
}

function Row({ children, link }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.row}>
            {children}
        </a>
    )
}

export default Footer;
