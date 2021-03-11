import React from 'react';
import logo from '../assets/logo.jpg';
import styles from '../styles/Header.module.css';

function Header() {
    return (
        <div className={styles.Header}>
            <img src={logo} alt="Logo"/>
            <div className={styles.title}>Devsnest Teams</div>
        </div>
    )
}

export default Header;
