import React, { useState } from 'react';
import styles from '../styles/Admin.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import urls from '../config.js';
import { FaPlus, FaMinus } from 'react-icons/fa';
import one from '../assets/login/1.jpg';

function Admin() {

    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    async function checkAuthentication() {
        setIsLoading(true);
        try {
            const {data} = await axios.post(urls.checkPassword, {
                username: username,
                password: password
            });
            toast.success(data.message);
            setIsLoading(false);
            setIsAuthenticated(true);
            fetchData();
        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message);
            } else if(error.request) {
                toast.error("Server is not Responding!");
                // console.log(error.request);
            } else {
                toast.error(error.message);
                // console.log(error.message);
            }
            setIsLoading(false);
        }
    }

    async function fetchData() {
        setIsLoading(true);
        try {
            const {data} = await axios.get(urls.getUsers);
            // console.log(data);
            toast.info(data.message);
            setUsers(data.data);
            setIsLoading(false);
        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message);
            } else if(error.request) {
                toast.error("Server is not Responding!");
                // console.log(error.request);
            } else {
                toast.error(error.message);
                // console.log(error.message);
            }
            setIsLoading(false);
        }
    }

    async function updateScore(username, type, tag) {
        try {
            setButtonIsLoading(true);
            const {data} = await axios.post(urls.updateSore, {
                username,
                type,
                tag
            });
            // console.log(data);
            toast.info(data.message);
            
            let updatedUsers = users.map(user => {
                if(user.username === username) {
                    return data.data;
                } else {
                    return user;
                }
            })
            setUsers(updatedUsers);
            setButtonIsLoading(false);

        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message);
            } else if(error.request) {
                toast.error("Server is not Responding!");
                // console.log(error.request);
            } else {
                toast.error(error.message);
                // console.log(error.message);
            }
            setButtonIsLoading(false);
        }
    }

    if(isLoading) {
        return (
            <div className={styles.Admin}>
                Loading...
            </div>
        )
    }

    if(!isAuthenticated) {
        return (
            <div className={styles.Admin_login}>
                <div className={styles.login_l}>
                    <div className={styles.title}>
                        Softskill Admin Login
                    </div>

                    <div className={styles.login}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => checkAuthentication()}>Login</button>
                    </div>
                </div>
                <div className={styles.login_r}>
                    <img src={one} alt="One"/>
                </div>
                </div>
        )
    }

    return (
        <div className={styles.Admin}>
            <div className={styles.title}>Softskill Admin Dashboard</div>
            <div className={styles.total_students}>Total Students: {users.length}</div>
            <div className={styles.data}>
                {
                    users.map((user, index) => (
                        <div className={styles.user} key={index}>
                            <div className={styles.user_name}>
                                {user.username}
                            </div>
                            <table>
                                <tbody>
                                    <tr className={styles.user_data}>
                                        <td>Debate</td>
                                        <td>{user.debate}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'debate')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'debate')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Mock Interview(P)</td>
                                        <td>{user.mockInterviewP}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'mockInterviewP')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'mockInterviewP')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Mock Interview(I)</td>
                                        <td>{user.mockInterviewI}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'mockInterviewI')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'mockInterviewI')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Summarization</td>
                                        <td>{user.summarization}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'summarization')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'summarization')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Tech Summarization</td>
                                        <td>{user.techsummarization}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'techsummarization')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'techsummarization')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Presentation</td>
                                        <td>{user.presentation}</td>
                                        <td className={styles.plus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, 1, 'presentation')}><FaPlus/></td>
                                        <td className={styles.minus}
                                            style={{pointerEvents: `${buttonIsLoading? 'none' : 'auto'}`, cursor: `${buttonIsLoading? 'not-allowed' : 'pointer'}`}}
                                            onClick={() => updateScore(user.username, -1, 'presentation')}><FaMinus/></td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>Total</td>
                                        <td colSpan="3">{user.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Admin;
