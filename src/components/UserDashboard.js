import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import styles from "../styles/UserDashboard.module.css";
import Logo from "../assets/logo.jpg";
import defaultProfile from "../assets/defaultProfile.jpg";
import { db } from "../utils/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

function UserDashboard() {

    const params = useParams();
    const userDB = db.collection("users").doc(params.id);
    const { authUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const userCardRef = useRef(null);

    const [type, setType] = useState("debate");
    const [points, setPoints] = useState(1);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true);
                const user = await userDB.get();
                if (user.exists) {
                    setUser(user.data());
                } else {
                    toast.error("Invalid User ID");
                }
                setIsLoading(false);
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
        fetchUser();
    }, [params]);

    async function updatePoints(sign) {
        try {
            setButtonLoading(true);
            const newPoints = user[type] + points * sign;
            const total = user.debate + user.mockInterviewI + user.mockInterviewP + user.summarization + user.techsummarization + user.presentation + points * sign;
            await userDB.update({
                [type]: newPoints,
                total,
            });
            setButtonLoading(false);
            toast.success("Points Updated");
            setUser({ ...user, total, [type]: newPoints });
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
            setButtonLoading(false);
        }
    }

    function downloadUserCard() {
        let link = document.createElement("a");
        link.download = `${user.username}.png`;
        domtoimage.toPng(userCardRef.current).then(dataURL => {
            link.href = dataURL;
            link.click();
        }).catch(err => console.log(err));
    }

    if (isLoading) {
        return (
            <div className={styles.UserDashboard}>
                Loading...
            </div>
        )
    }

    return (
        <div className={styles.UserDashboard}>
            {
                user ?
                    <>
                        <div ref={userCardRef}>
                            <div className={styles.user_card}>
                                <div className={styles.card_head}>
                                    <img src={Logo} alt="Logo" />
                                Devsnest Softskill Club
                            </div>
                                <div className={styles.card_body}>
                                    <div>
                                        <img src={defaultProfile} alt="User" />
                                        <div className={styles.username}>{user.username}</div>
                                        <div>{`${user.isLeader ? "Leader" : "Member"} of Team ${user.teamID}`}</div>
                                    </div>
                                    <div className={styles.points}>
                                        <div className={styles.row}><span>Debate</span><span style={{ paddingLeft: "15px" }}>{user.debate}</span></div>
                                        <div className={styles.row}><span>Mock Interview(P)</span><span style={{ paddingLeft: "15px" }}>{user.mockInterviewP}</span></div>
                                        <div className={styles.row}><span>Mock Interview(I)</span><span style={{ paddingLeft: "15px" }}>{user.mockInterviewI}</span></div>
                                        <div className={styles.row}><span>Summarization</span><span style={{ paddingLeft: "15px" }}>{user.summarization}</span></div>
                                        <div className={styles.row}><span>Tech Summarization</span><span style={{ paddingLeft: "15px" }}>{user.techsummarization}</span></div>
                                        <div className={styles.row}><span>Presentation</span><span style={{ paddingLeft: "15px" }}>{user.presentation}</span></div>
                                        <div className={`${styles.row} ${styles.total}`}><span>Total</span><span style={{ paddingLeft: "15px" }}>{user.total}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            authUser &&
                            <div className={styles.user_update_score}>
                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="debate">Debate</option>
                                    <option value="mockInterviewI">Mock Interview I</option>
                                    <option value="mockInterviewP">Mock Interview P</option>
                                    <option value="summarization">Summarzation</option>
                                    <option value="techsummarization">Tech Summarization</option>
                                    <option value="presentation">Presentation</option>
                                </select>

                                <select value={points} onChange={(e) => setPoints(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <div>
                                    <button onClick={() => updatePoints(1)} disabled={buttonLoading}>Add</button>
                                    <button onClick={() => updatePoints(-1)} disabled={buttonLoading}>Sub</button>
                                </div>
                            </div>
                        }

                        <button onClick={() => downloadUserCard()}>Download Card</button>
                    </>
                    :
                    "Invalid User ID"
            }
        </div>
    )
}

export default UserDashboard;
