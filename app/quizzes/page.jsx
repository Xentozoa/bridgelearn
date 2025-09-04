"use client";

import Link from 'next/link';
import { mockQuizzes } from '../lib/mock-data';

const QuizzesHub = () => {
  return (
    <>
      <style jsx global>{`
        /*
          =======================================================
          Quizzes Hub & Page Styles
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

        .header {
          text-align: center;
          margin-bottom: 40px;
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

        .quizzes-hub-container {
            padding: 2rem 0;
        }

        .quiz-cards-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .quiz-card {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }

        .quiz-card h3 {
            font-size: 1.5rem;
            color: var(--accent-1);
        }
        
        .quiz-card p {
            color: var(--primary-text);
            opacity: 0.8;
        }
        
        .quiz-status {
            background-color: var(--sober-accent-2);
            color: var(--primary-text);
            padding: 8px 16px;
            border-radius: var(--radius);
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: bold;
            align-self: flex-start;
            margin-top: 1rem;
        }
      `}</style>
      <div className="quizzes-hub-container">
        <header className="header">
          <h1>Quizzes Hub</h1>
          <p>Test your knowledge with these interactive quizzes!</p>
        </header>

        <section className="quiz-cards-section">
          {mockQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card box-card">
              <div>
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
              </div>
              {quiz.questions.length > 0 ? (
                <Link href={`/quizzes/${quiz.id}`} className="quiz-link link">
                  Start Quiz
                </Link>
              ) : (
                <span className="quiz-status incomplete">Coming Soon</span>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default QuizzesHub;
