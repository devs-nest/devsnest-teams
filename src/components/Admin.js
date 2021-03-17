import React, { useState, useEffect } from 'react';
import styles from '../styles/Admin.module.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaMinus } from 'react-icons/fa';

function Admin() {

    const history = useHistory();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        checkAuthentication();
    }, []);

    async function checkAuthentication() {
        setIsLoading(true);
        try {
            const {data} = await axios.post('http://localhost:5000/api/v1/admin/check-password', {
                username: params.username,
                password: params.password
            });
            toast.success(data.message);
            setIsLoading(false);
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
            history.push('/');
        }
    }

    async function fetchData() {
        setIsLoading(true);
        try {
            const {data} = await axios.get('http://localhost:5000/api/v1/softskill/get-users');
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
            const {data} = await axios.post('http://localhost:5000/api/v1/softskill/update-score', {
                username,
                type,
                tag
            });
            console.log(data);
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
