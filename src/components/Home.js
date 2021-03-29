import React from 'react';
import styles from '../styles/Home.module.css';
import logo from '../assets/home/logo.png';
import team from '../assets/team.svg';

function Home() {
    return (
        <main className={styles.Home}>
            <section className={styles.hero}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <div className={styles.logo}><img src={logo} alt="Logo" width="100px" height="100px"/></div>
                        <div className={styles.name}>Softskill Club</div>
                    </div>
                    <div className={styles.title}>The other 20% stuff that isn’t tech.</div>
                    <div className={styles.sub_title}>A mentorship program designed to help you get your dream job. It evolves as per your needs to mould you into a kickass developer.</div>
                    <a href="https://discord.gg/rGQCswxcx6" target="_blank" rel="noreferrer">Join Discord</a>
                </div>
                <div className={styles.img}>
                    <img src={team} alt="Team"/>
                </div>
            </section>
        </main>
    )
}

export default Home;
