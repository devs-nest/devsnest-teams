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
                    to="/course_teams"
                    className={styles.item}
                >
                    Course Team
                </Link>
                <Link
                    to="/softskill_teams"
                    className={styles.item}
                >
                    Softskill Teams
                </Link>
                <Link
                    to="/softskill_leaderboard"
                    className={styles.item}
                >
                    Softskill Leaderboard
                </Link>
            </div>
        </div>
    )
}

export default Header;
