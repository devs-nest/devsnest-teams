import React from 'react';
import logo from '../assets/logo.jpg';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className={styles.Header}>
            <Link className={styles.left} to='/'>
                <img src={logo} alt="Logo" />
            </Link>
            <div className={styles.right}>
                <Link
                    to="/teams"
                    className={styles.item}
                >
                    Teams
                </Link>
                <Link
                    to="/leaderboard"
                    className={styles.item}
                >
                    Leaderboard
                </Link>
            </div>
        </div>
    )
}

export default Header;
