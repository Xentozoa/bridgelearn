"use client";

import { useState, useEffect, use } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

// MOCK DATA (In a real app, this would come from a database)
const mockUserData = {
  name: "Learner",
  lessonsCompleted: 5,
  totalLessons: 10,
  quizzesTaken: 8,
  rewardsEarned: 3,
};

// =======================================================
// Main Dashboard Component
// =======================================================

const Dashboard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress on component mount
    const calculatedProgress = Math.round((mockUserData.lessonsCompleted / mockUserData.totalLessons) * 100);
    setProgress(calculatedProgress);
  }, []);

  return (
    <>
      <style jsx global>{`
        /*
          =======================================================
          Global Styles for BridgeLearn - CodeCore Protocol
          - A cohesive, futuristic humanoid theme
          =======================================================
        */
        :root {
          /* New Futuristic Humanoid Color Palette */
          --primary-bg: #0a0a0a;      /* Deep black for the core interface */
          --primary-text: #e0e0e0;    /* Light gray for data streams */
          --accent-1: #00ffff;        /* Bright cyan for active circuits */
          --accent-2: #ff00ff;        /* Vibrant magenta for power-up signals */
          --card-bg: #1a1a1a;         /* Dark gray for containment fields */
          --sober-accent-1: #333333;  /* Muted gray for background structures */
          --sober-accent-2: #444444;  /* Muted gray for borders */
          
          /* Spacing */
          --spacing-xs: 4px;
          --spacing-sm: 8px;
          --spacing-md: 16px;
          --spacing-lg: 24px;
          --spacing-xl: 32px;

          /* Futurist Design Variables */
          --border-solid: 1px solid var(--accent-1);
          --radius: 4px; /* Sharper corners for a robotic feel */
        }

        html, body {
          background-color: var(--primary-bg);
          color: var(--primary-text);
          font-family: 'Josefin Sans', sans-serif;
          margin: 0;
          padding: 0;
          line-height: 1.6;
          min-height: 100vh;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Libre Baskerville', serif;
          color: var(--primary-text);
          margin-top: 0;
        }
        
        h1 {
          font-size: 2.5rem;
          color: var(--accent-1);
        }

        h2 {
          font-size: 2rem;
        }

        .content-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .box-card {
          background: var(--card-bg);
          border: var(--border-solid);
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        
        .box-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px var(--accent-2);
        }

        .link {
          background: var(--accent-1);
          color: var(--primary-bg);
          padding: 0.8rem 1.6rem;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-weight: bold;
          text-decoration: none;
          transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
          display: inline-block;
          text-align: center;
        }

        .link:hover {
          background: var(--accent-2);
          transform: scale(1.02);
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h1 {
          font-size: 3rem;
          margin-bottom: 8px;
          background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px var(--accent-1);
        }
        
        .header p {
          opacity: 0.8;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--sober-accent-1);
          color: var(--primary-bg);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid var(--border-glass);
          backdrop-filter: blur(10px);
        }
        
        .navbar .logo a {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary-bg);
        }
        
        .navbar .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .navbar .nav-links li a {
          color: var(--primary-bg);
          font-family: 'Josefin Sans', sans-serif;
          font-weight: bold;
          transition: color 0.3s ease-in-out;
        }
        
        .navbar .nav-links li a:hover {
          color: var(--accent-2);
        }
        
        .dashboard-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .progress-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .progress-section h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .progress-card-container {
          width: 150px;
          margin: 0 auto;
        }

        .stats-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .stats-card {
          background-color: var(--sober-accent-1);
          padding: 1rem;
          text-align: center;
          border-radius: var(--radius);
          flex: 1;
          min-width: 120px;
          transition: transform 0.3s ease-in-out;
        }

        .stats-card:hover {
          transform: translateY(-3px);
        }

        .stats-value {
          color: var(--accent-1);
          font-size: 2rem;
          margin: 0;
        }

        .stats-label {
          color: var(--primary-text);
          font-size: 0.9rem;
          margin: 0;
        }

        .quick-links {
          text-align: center;
        }

        .quick-links h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        .links-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .link {
          background-color: var(--accent-1);
          color: var(--primary-bg);
          padding: 15px 25px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1rem;
          transition: background-color 0.3s, transform 0.3s;
        }

        .link:hover {
          background-color: var(--accent-2);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-tagline {
            font-size: 1.25rem;
          }
          .landing-card-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <header className="header">
          <h1>Greetings, {mockUserData.name}.</h1>
          <p>Your learning data stream is live and active.</p>
        </header>
        
        <div className="box-card">
          <section className="progress-section">
            <h2>System Progress</h2>
            <div className="progress-card-container">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  pathColor: `var(--accent-2)`,
                  textColor: 'var(--primary-text)',
                  trailColor: 'var(--sober-accent-2)',
                  backgroundColor: 'transparent',
                })}
              />
            </div>
          </section>
        </div>

        <div className="box-card" style={{ marginTop: '20px' }}>
          <section className="stats-section">
            <h2>Quick Stats</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <StatsCard label="Lessons Completed" value={mockUserData.lessonsCompleted} />
              <StatsCard label="Quizzes Taken" value={mockUserData.quizzesTaken} />
              <StatsCard label="Rewards Earned" value={mockUserData.rewardsEarned} />
            </div>
          </section>
        </div>

        <div className="box-card" style={{ marginTop: '20px' }}>
          <section className="quick-links">
            <h2>Access Core Circuits</h2>
            <div className="links-container">
              <Link href="/lessons" className="link">
                Lessons Hub
              </Link>
              <Link href="/quizzes" className="link">
                Quizzes Hub
              </Link>
              <Link href="/rewards" className="link">
                Rewards & Leaderboard
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// =======================================================
// Reusable Sub-Component
// =======================================================

const StatsCard = ({ label, value }) => {
  return (
    <div className="stats-card">
      <h4 className="stats-value">{value}</h4>
      <p className="stats-label">{label}</p>
    </div>
  );
};

export default Dashboard;
