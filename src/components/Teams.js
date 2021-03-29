import React from 'react';
import styles from '../styles/Teams.module.css';
import data from '../assets/data/data2';

function SoftskillTeams() {
    return (
        <div className={styles.SoftskillTeams}>
            <div className={styles.title}>
                Softskill Teams
            </div>
            <div className={styles.cards}>
                {
                    data.map((row, index) => (
                        <div key={index} className={styles.card}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Team ID</th>
                                        <td>{row.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Team Leader</th>
                                        <td>{row.leader}</td>
                                    </tr>
                                    <tr>
                                        <th>Members</th>
                                        <td>
                                            <div>{row.member1}</div>
                                            <div>{row.member2}</div>
                                            <div>{row.member3}</div>
                                            <div>{row.member4}</div>
                                        </td>
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

export default SoftskillTeams;
