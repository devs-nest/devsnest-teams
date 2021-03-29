import React, { useState } from 'react';
import styles from '../styles/TeamPage.module.css';
import data from '../../assets/data/data';

function TeamPage() {

    const [teamsData, setTeamsData] = useState(data);
    const [input, setInput] = useState("");

    return (
        <div className={styles.TeamPage}>
            <input type="text" placeholder="Search Discord Username" value={input} onChange={(e) => {
                setInput(e.target.value.trimStart());
                if (e.target.value.trimStart() !== "") {
                    setTeamsData(data.filter(team => {
                        return team.members.filter(member => member.toLocaleLowerCase().includes(e.target.value.trimStart().toLowerCase())).length !== 0;
                    }));
                } else {
                    setTeamsData(data);
                }
            }} />
            <div className={styles.teams}>
                {
                    teamsData.map((team, index) => (
                        <table className={styles.team} key={index}>
                            <tr className={styles.id}>
                                <td>Team ID</td>
                                <td>{team.id}</td>
                            </tr>
                            <tr className={styles.name}>
                                <td>Team Name</td>
                                <td>{team.name}</td>
                            </tr>
                            <tr className={styles.name}>
                                <td>Leader</td>
                                <td>{team.leader}</td>
                            </tr>
                            <tr className={styles.name}>
                                <td>Vice Leader</td>
                                <td>{team.viceLeader ? team.viceLeader : <span style={{ color: "red" }}>Not Assigned</span>}</td>
                            </tr>
                            <tr className={styles.members}>
                                <td>Team Members</td>
                                <td>
                                    <table>
                                        {
                                            team.members.map((member, index) => (
                                                <tr className={styles.member} key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{member}</td>
                                                </tr>
                                            ))
                                        }
                                    </table>
                                </td>
                            </tr>
                        </table>
                    ))
                }
            </div>
        </div>
    )
}

export default TeamPage;
