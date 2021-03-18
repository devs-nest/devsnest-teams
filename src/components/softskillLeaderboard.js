import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/SoftskillLeaderboard.module.css';
import useCurrentWidth from '../utils/useCurrentWidth.js';
import urls from '../config.js';

function SoftskillLeaderboard() {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    let width = useCurrentWidth();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const {data} = await axios.get(urls.getUsers);
                setUsers(data.data.sort((obj1, obj2) =>
                    obj2.total - obj1.total
                ));
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
        fetchData();
    }, []);

    const D = width > 750 ? "Debate" : "D";
    const MIP = width > 750 ? "Mock Interview(P)" : "MI(P)";
    const MII = width > 750 ? "Mock Interview(I)" : "MI(I)";
    const S = width > 750 ? "Summarization" : "S";
    const TS = width > 750 ? "Tech Summarization" : "TS";
    const P = width > 750 ? "Presentation" : "P";

    if(isLoading) {
        return (
            <div className={styles.SoftskillLeaderboard}>
                Loading...
            </div>
        )
    }

    return (
        <div className={styles.SoftskillLeaderboard}>
            <div className={styles.title}>
                Softskill Leaderboard
            </div>
            {
                width <= 750 &&
                <>
                    <div>Debate -&gt; D</div>
                    <div>Mock Interview(P) -&gt; MI(P)</div>
                    <div>Mock Interview(I) -&gt; MI(I)</div>
                    <div>Summarization -&gt; S</div>
                    <div>Tech Summarization -&gt; TS</div>
                    <div>Presentation -&gt; P</div>
                </>
            }
            <div className={styles.data}>
                {
                    users.map((user, index) => (
                        <div className={styles.user} key={index}>
                            <div className={styles.main}>
                                <div className={styles.rank}>
                                    {index+1}.
                                </div>
                                <div className={styles.user_name}>
                                    {user.username}
                                </div>
                            </div>
                            <table>
                                <tbody>
                                    <tr className={styles.user_data}>
                                        <td>{D}</td>
                                        <td>{MIP}</td>
                                        <td>{MII}</td>
                                        <td>{S}</td>
                                        <td>{TS}</td>
                                        <td>{P}</td>
                                        <td>Total</td>
                                    </tr>
                                    <tr className={styles.user_data}>
                                        <td>{user.debate}</td>
                                        <td>{user.mockInterviewP}</td>
                                        <td>{user.mockInterviewI}</td>
                                        <td>{user.summarization}</td>
                                        <td>{user.techsummarization}</td>
                                        <td>{user.presentation}</td>
                                        <td>{user.total}</td>
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

export default SoftskillLeaderboard;
