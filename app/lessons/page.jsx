"use client";

import { useState } from 'react';
import Link from 'next/link';
import { mockLessons } from '../lib/mock-data';

const AIAssistant = () => {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const handleTraitClick = async (trait) => {
    setLoading(true);
    setError('');
    setResponse('');

    const systemPrompt = `Act as a senior software engineer who is an expert in computer science education. Provide a concise, single-paragraph explanation. Keep the tone of the explanation consistent with this style: "${trait}".`;
    const userQuery = `Explain the programming topic: "${topic}".`;
    
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "google_search": {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      const result = await res.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setResponse(generatedText);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch from AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const personalityTraits = [
    "Explain me like I'm five",
    "Explain me in a fun way",
    "Explain me with examples",
    "Explain me in a story",
  ];

  return (
    <div className="box-card ai-assistant-card">
      <section className="ai-assistant-section">
        <h2>AI Learning Assistant</h2>
        <p className="ai-intro">Query the data core for quick explanations on any topic.</p>
        
        <div className="ai-input-container">
          <input
            type="text"
            className="ai-input"
            placeholder="Enter a topic, e.g., 'Arrays'"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="ai-traits-container">
          {personalityTraits.map(trait => (
            <button
              key={trait}
              className="ai-trait-button"
              onClick={() => handleTraitClick(trait)}
              disabled={!topic || loading}
            >
              {trait}
            </button>
          ))}
        </div>

        <div className="ai-response-container">
          {loading ? (
            <p className="ai-loading">Processing your request...</p>
          ) : error ? (
            <p className="ai-error-text">{error}</p>
          ) : (
            <p className="ai-response-text">{response}</p>
          )}
        </div>
      </section>
    </div>
  );
};

const LessonsHub = () => {
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
        
        .lessons-hub-container {
          padding: 2rem 0;
        }

        .lesson-cards-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .lesson-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .lesson-card h3 {
          font-size: 1.5rem;
          color: var(--accent-1);
        }

        .lesson-card p {
          color: var(--primary-text);
          opacity: 0.8;
        }

        .lesson-status {
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
        
        .ai-assistant-card {
          margin-bottom: 2rem;
          text-align: left;
        }

        .ai-intro {
          color: var(--primary-text);
          opacity: 0.8;
        }

        .ai-input-container {
          margin-bottom: 1rem;
        }

        .ai-input {
          width: 100%;
          padding: 0.75rem;
          background: var(--sober-accent-2);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius);
          color: var(--primary-text);
          font-size: 1rem;
        }

        .ai-input::placeholder {
          color: var(--primary-text);
          opacity: 0.5;
        }

        .ai-traits-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .ai-trait-button {
          background-color: var(--sober-accent-1);
          color: var(--primary-text);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s, transform 0.3s;
        }

        .ai-trait-button:hover:not(:disabled) {
          background-color: var(--accent-1);
          color: var(--primary-bg);
          transform: translateY(-2px);
        }

        .ai-trait-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .ai-response-container {
          background: var(--sober-accent-1);
          padding: 1rem;
          border-radius: var(--radius);
          border: 1px solid var(--accent-1);
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-response-text, .ai-loading, .ai-error-text {
          color: var(--primary-text);
          opacity: 0.9;
        }
      `}</style>
      <div className="lessons-hub-container">
        <header className="header">
          <h1>Lessons Hub</h1>
          <p>Choose a lesson to start or continue your learning journey.</p>
        </header>
        <AIAssistant/>
        <section className="lesson-cards-section">
          {mockLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card box-card">
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              {lesson.isCompleted ? (
                <span className="lesson-status completed">Completed</span>
              ) : (
                <Link href={`/lessons/${lesson.slug}`} className="lesson-link link">
                  Start Lesson
                </Link>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default LessonsHub;
