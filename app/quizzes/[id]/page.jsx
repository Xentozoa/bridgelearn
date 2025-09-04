"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockQuizzes } from '../../lib/mock-data';

// =======================================================
// AI Assistant Component
// =======================================================
const AIAssistant = ({ questionText }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const handleHelpClick = async (trait) => {
    setLoading(true);
    setError('');
    setResponse('');

    const systemPrompt = `You are an expert tutor. Provide a concise hint to help the student answer the following question. Do not give the direct answer. Keep the tone of the explanation consistent with this style: "${trait}".`;
    const userQuery = `Help me with this question: "${questionText}".`;
    
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "google_search": {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
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
    <div className="ai-quiz-assistant-container">
      <div className="ai-traits-container">
        {personalityTraits.map(trait => (
          <button
            key={trait}
            className="ai-trait-button"
            onClick={() => handleHelpClick(trait)}
            disabled={loading}
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
    </div>
  );
};


// =======================================================
// Main Quiz Page Component
// =======================================================
const QuizPage = ({ params }) => {
  const unwrappedParams = use(params);
  const quiz = mockQuizzes.find(q => q.id === parseInt(unwrappedParams.id));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsQuizComplete(false);
    setScore(0);
  }, [unwrappedParams.id]);

  if (!quiz || quiz.questions.length === 0) {
    notFound();
  }

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    if (option === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setIsQuizComplete(true);
      // Save the final score to localStorage
      localStorage.setItem('quizScore', score);
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <>
      <style jsx global>{`
        /*
          =======================================================
          Quiz Page Styles
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

        .quiz-page-container {
            padding: 2rem 0;
        }

        .quiz-content {
            margin-top: 2rem;
            text-align: left;
        }

        .question-text {
            font-size: 1.25rem;
            color: var(--primary-text);
            margin-bottom: 1.5rem;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .option-button {
            background-color: var(--sober-accent-1);
            color: var(--primary-text);
            padding: 1rem;
            border-radius: var(--radius);
            border: 1px solid var(--border-glass);
            text-align: left;
            transition: background-color 0.3s, transform 0.3s;
        }

        .option-button:hover:not(:disabled) {
            background-color: var(--accent-1);
            color: var(--primary-bg);
            transform: translateY(-2px);
        }
        
        .option-button:disabled {
            cursor: not-allowed;
        }

        .option-button.correct {
            background-color: #28a745;
            color: white;
            border-color: #28a745;
        }

        .option-button.incorrect {
            background-color: #dc3545;
            color: white;
            border-color: #dc3545;
        }

        .next-button {
            margin-top: 2rem;
            width: 100%;
            background-color: var(--accent-1);
            color: var(--primary-bg);
            padding: 1rem;
            border-radius: var(--radius);
        }

        .quiz-results {
            margin-top: 2rem;
            text-align: center;
        }

        .score-text {
            font-size: 2rem;
            color: var(--accent-1);
            font-weight: bold;
        }

        .results-link {
            display: inline-block;
            margin-top: 1rem;
        }

        .ai-quiz-assistant-container {
          margin-top: 2rem;
          background: var(--sober-accent-1);
          padding: 1rem;
          border-radius: var(--radius);
          border: 1px solid var(--accent-1);
        }
        
        .ai-traits-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .ai-trait-button {
          background-color: var(--sober-accent-2);
          color: var(--primary-text);
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s, transform 0.3s;
        }

        .ai-trait-button:hover:not(:disabled) {
          background-color: var(--accent-2);
          transform: translateY(-2px);
        }

        .ai-response-container {
          background: var(--card-bg);
          padding: 1rem;
          border-radius: var(--radius);
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
      <div className="quiz-page-container">
        <header className="header">
          <Link href="/quizzes" className="back-link link">← Back to Quizzes</Link>
          <h1>{quiz.title}</h1>
        </header>

        {!isQuizComplete ? (
          <div className="quiz-content box-card">
            <p className="question-text">{currentQuestion.text}</p>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`option-button ${
                    selectedAnswer === option
                      ? (option === currentQuestion.correctAnswer ? 'correct' : 'incorrect')
                      : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              className="next-button"
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
            <AIAssistant questionText={currentQuestion.text} />
          </div>
        ) : (
          <div className="quiz-results box-card">
            <h2>Quiz Complete!</h2>
            <p className="score-text">You scored {score} out of {quiz.questions.length}.</p>
            <Link href="/dashboard" className="results-link link">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
