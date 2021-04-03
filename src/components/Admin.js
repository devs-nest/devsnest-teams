import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';
import styles from '../styles/Admin.module.css';
import one from '../assets/login/1.jpg';

function Admin() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, authUser, logout } = useAuth();
    const history = useHistory();

    async function checkAuthentication() {
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success("Login Successfully");
            setIsLoading(false);
            history.push("/");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("Server is not Responding!");
                // console.log(error.request);
            } else {
                toast.error(error.message);
                // console.log(error.message);
            }
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className={styles.Admin}>
                Loading...
            </div>
        )
    }

    async function handleLogout() {
        try {
            await logout();
        } catch(error) {
            toast.error("Error in logging out!")
        }
    }

    return (
        <div className={styles.Admin_login}>
            <div className={styles.login_l}>
                <div className={styles.title}>
                    {
                        authUser ? `Welcome ${authUser.email}` : "Softskill Admin Login"
                    }
                </div>
                {
                    authUser &&
                    <button style={{marginTop: "1rem", padding: "0.5rem", fontSize: "1rem"}} onClick={() => handleLogout()}>Logout</button>
                }
                {
                    !authUser &&
                    <div className={styles.login}>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => checkAuthentication()}>Login</button>
                    </div>
                }
            </div>
            <div className={styles.login_r}>
                <img src={one} alt="One" />
            </div>
        </div>
    )
}

export default Admin;
