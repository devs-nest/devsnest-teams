import React from 'react';
import logo from '../assets/logo.jpg';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Header() {
    const { authUser, logout } = useAuth();

    async function handleLogout() {
      try {
        await logout();
      } catch (error) {
        toast.error("Error in logging out!");
      }
    }


    return (
      <div className={styles.Header}>
        <Link className={styles.left} to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className={styles.right}>
          <Link to="/teams" className={styles.item}>
            Teams
          </Link>
          <Link to="/leaderboard" className={styles.item}>
            Leaderboard
          </Link>
          {authUser && (
            <button
              style={{
                marginLeft: "1rem",
                padding: "0.3rem",
                backgroundColor: "transparent",
                border: "none"
              }}
              onClick={() => handleLogout()}
              className={styles.item}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    );
}

export default Header;
