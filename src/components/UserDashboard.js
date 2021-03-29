import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import urls from "../config";
import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import styles from "../styles/UserDashboard.module.css";
import Logo from "../assets/logo.jpg";
import defaultProfile from "../assets/defaultProfile.jpg";

function UserDashboard() {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const userCardRef = useRef(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${urls.getUser}/${params.id}`);
                setUser(data.data);
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

    if (isLoading) {
        return (
            <div className={styles.UserDashboard}>
                Loading...
            </div>
        )
    }

    function downloadUserCard() {
        let link = document.createElement("a");
        link.download = `${user.username}.png`;
        domtoimage.toPng(userCardRef.current).then(dataURL => {
            link.href = dataURL;
            link.click();
        }).catch(err => console.log(err));
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
                                        <div>Member</div>
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
                        <button onClick={() => downloadUserCard()}>Download Card</button>
                    </>
                    :
                    "Invalid User ID"
            }
        </div>
    )
}

export default UserDashboard;
