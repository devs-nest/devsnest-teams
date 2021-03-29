import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaLink, FaDiscord, FaLinkedin, FaFacebookSquare, FaInstagramSquare, FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <div className={styles.Footer}>
            <div>
                <Row link="https://www.devsnest.in">
                    <FaLink size={35} />
                </Row>
                <Row link="https://discord.gg/rGQCswxcx6">
                    <FaDiscord size={35} />
                </Row>
                <Row link="https://www.linkedin.com/company/devsnest/">
                    <FaLinkedin size={35} />
                </Row>
                <Row link="https://www.facebook.com/devsnest/">
                    <FaFacebookSquare size={35} />
                </Row>
                <Row link="https://www.instagram.com/devsnest.in/">
                    <FaInstagramSquare size={35} />
                </Row>
            </div>

            <div className={styles.email}>
                support@devsnest.in
            </div>

            <div className={styles.source_code}>
                <a href="https://github.com/devs-nest/devsnest-teams" target="_blank" rel="noopener noreferrer">
                    <FaGithub />&nbsp;GitHub
                </a>
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
