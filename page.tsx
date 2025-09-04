"use client";

import Link from 'next/link';
import 'react-circular-progressbar/dist/styles.css';

const LandingPage = () => {
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
        
.landing-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
.hero-section {
          min-height: 100vh; /* Force hero section to fill the viewport */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden; /* Hide the airplane's starting position */
        }
        
.hero-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        
.hero-tagline {
          font-size: 1.5rem;
          color: var(--primary-text);
          margin-bottom: 2rem;
        }
        
.hero-cta-button {
          background-color: var(--accent-1);
          color: var(--primary-bg);
          padding: 1rem 2.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: background-color 0.3s, transform 0.3s;
        }
        
.hero-cta-button:hover {
          background-color: var(--accent-2);
          transform: translateY(-3px);
        }

.scroll-down-arrow {
            position: absolute;
            bottom: 2rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-7px);
          }
        }
        
.landing-card-container {
          display: flex; /* Use flexbox for horizontal alignment */
          gap: 2rem;
          margin-top: 2rem;
          width: 100%;
          justify-content: center; /* Center the cards horizontally */
          align-items: stretch; /* Make all cards the same height */
        }
        
.landing-card {
          flex: 1; /* Allow cards to grow and fill space equally */
          display: flex;
          flex-direction: column;
          text-align: left;
          height: 100%;
          justify-content: flex-start;
          align-items: flex-start;
        }

.landing-card h2 {
          color: var(--accent-1);
          margin-bottom: 1rem;
        }

.landing-card ul {
          list-style: none; /* Remove default list bullets */
          padding: 0;
          margin: 0;
          width: 100%;
        }

.landing-card ul li {
          padding: 0.5rem 0;
          border-left: 2px solid var(--accent-1);
          padding-left: 1rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-tagline {
            font-size: 1.25rem;
          }
          .landing-card-container {
            flex-direction: column; /* Stack cards vertically on smaller screens */
          }
        }
      `}</style>
      <div className="landing-page-container">
        <header className="hero-section">
          <h1 className="hero-title">PRACTICE WITH FUN</h1>
          <p className="hero-tagline">Engage in real-time 1v1 DSA battles against other learners to sharpen your skills.</p>
          <div className="hero-cta-container">
            <Link href="/dashboard" className="hero-cta-button">
              Start Battle
            </Link>
          </div>
          <div className="scroll-down-arrow">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down" style={{ color: 'var(--accent-1)' }}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </header>

        <div className="landing-card-container">
          <div className="landing-card box-card">
            <h2>Interactive Lessons</h2>
            <p>Access structured data packets and hands-on code simulations.</p>
          </div>
          
          <div className="landing-card box-card">
            <h2>Circuitry Quizzes</h2>
            <p>Test your neural network's processing speed with logic gate challenges.</p>
          </div>
          
          <div className="landing-card box-card">
            <h2>Progress Tracking</h2>
            <p>Visualize your data stream with points, badges, and a real-time leaderboard.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
