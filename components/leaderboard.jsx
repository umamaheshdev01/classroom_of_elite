import React from 'react';
import styles from './Leaderboard.module.css'; 

const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

const LeaderboardItem = ({ rank, name, score, position }) => {
  return (
    <div className={`${styles.item} ${position % 2 === 0 ? styles.even : ''}`}>
      <div className={styles.rank}>
        <span>{rank}.</span>
      </div>
      <div className={styles.user}>
        <img src="/placeholder.svg" width="32" height="32" alt={`User ${rank}`} className={styles.avatar} />
        <span>{name}</span>
      </div>
      <div className={styles.score}>
        <span>{score}</span>
        {position !== undefined && (
          <div className={`${styles.position} ${styles[`position${position}`]}`}>{position}</div>
        )}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'John Doe', score: 340, position: 1 },
    { rank: 2, name: 'Jane Smith', score: 320, position: 2 },
    { rank: 3, name: 'Chris Johnson', score: 310, position: 3 },
    { rank: 4, name: 'Amy Wilson', score: 300 },
    { rank: 5, name: 'Michael Brown', score: 290 },
    { rank: 6, name: 'Sarah Lee', score: 280 },
    { rank: 7, name: 'David Garcia', score: 270 },
    { rank: 8, name: 'Lisa Rodriguez', score: 260 },
    { rank: 9, name: 'Mark Martinez', score: 250 },
    { rank: 10 },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <h3 className={styles.title}>Leaderboard</h3>
          <p className={styles.subtitle}>Top 10 participants based on their scores.</p>
        </div>
        <div className={styles.items}>
          {leaderboardData.map((item, index) => (
            <LeaderboardItem key={index} {...item} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;
