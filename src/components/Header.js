import React from 'react';
import logo from '../assets/logo.jpg';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.left}>
                <img src={logo} alt="Logo"/>
                <Link className={styles.title} to='/'>Devsnest Teams</Link>
            </div>
            <div className={styles.right}>
                <Link
                    to="/points"
                    className={styles.item}
                >
                    Important Points
                </Link>
            </div>
        </div>
    )
}

export default Header;
