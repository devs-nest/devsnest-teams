import React from 'react';
import styles from '../styles/Points.module.css';

function Points() {
    return (
        <div className={styles.Points}>
            <div className={styles.title}>
                Important Points
            </div>
            <div className={styles.content}>
                <ul>
                    <li>1. Please post your doubts regarding team formation on <a href="https://discord.gg/bVmfsZYmsj" target="_blank" rel="noreferrer">"Course-Doubts"</a> Channel</li>
                    <li>2. The request for Team Change will be accepted on this Saturday and Sunday</li>
                    <li>3. Please do not change your Discord Username</li>
                    <li>4. Get familiar with your team leader and team members in your respective team channel</li>
                    <li>5. If you are not in any team yet, then fill this form: <a href="https://forms.gle/LQTmNhbz36VN5Uqx7" target="_blank" rel="noreferrer">https://forms.gle/LQTmNhbz36VN5Uqx7</a></li>
                    <li>6. If you have already filled the form, but your name is not here. That means you have not filled the form correctly.</li>
                    <li>7. The people whose primary language is English and are from foreign countries or South India, please contact <strong>Clavis</strong> so they can put you into a separate team for better communication</li>
                </ul>
            </div>
        </div>
    )
}

export default Points;
