"use client";

import { useState } from 'react';
import Link from 'next/link';
import { mockLessons } from './lib/mock-data';

const aiResponses = {
  arrays: {
    "Explain me like I'm five": "Imagine you have a row of empty boxes, and each box has a number on it. You can put one toy in each box. An array is like that row of boxes, and you can store different things in each one!",
    "Explain me in a fun way": "Arrays are like a digital treasure chest with multiple compartments. You can put your favorite memes, photos, or even entire video games in each compartment. The catch? You need a secret code (the index) to get to each one!",
    "Explain me with examples": "In JavaScript, you can create an array like this: `const fruits = ['apple', 'banana', 'cherry'];`. You can access the first item with `fruits[0]` and get the count with `fruits.length`.",
    "Explain me in a story": "Once, in a digital kingdom far, far away, there lived a wise data-sorcerer named Array. He had a magnificent scroll, and on it, he could write down a list of all the magic spells. Each spell was given a number, starting from zero. This allowed the king to call upon any spell instantly, just by knowing its number.",
    "Explain me in an interactive way": "Let's explore arrays! An array is a list of items. What's the first item in this list: `['cat', 'dog', 'bird']`? What do you think the code `list[2]` would return?",
  },
  // Add other topics here
  variables: {
    "Explain me like I'm five": "A variable is like a box with a label. You can put things in the box, and you can change what's inside. The label lets you know what's in it, like 'toys' or 'cookies'.",
    "Explain me in a fun way": "Variables are like Pokémon. Each one has a name, and you can store different values (like Pokémon characters) inside them. You can 'catch' a new value and store it, or you can release the old one!",
    "Explain me with examples": "In programming, you declare a variable with a name and assign it a value. For example, `let score = 100;` declares a variable named 'score' with the value 100. Later, you can change its value with `score = 150;`.",
    "Explain me in a story": "In a great digital city, there was a hero named `name`. He could hold the name of anyone in the city. One day, the city's hero changed, and the variable `name` was quickly updated to reflect the new hero's name. The variable `name` was the city's living, breathing directory.",
    "Explain me in an interactive way": "A variable is a placeholder for information. What kind of information would you store in a variable called `yourName`? What about a variable called `isLoggedIn`?",
  },
};

const AIAssistant = () => {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTraitClick = (trait) => {
    setLoading(true);
    setTimeout(() => {
      const topicKey = topic.toLowerCase();
      if (aiResponses[topicKey] && aiResponses[topicKey][trait]) {
        setResponse(aiResponses[topicKey][trait]);
      } else {
        setResponse(`I am a trainee AI and do not yet have data for the topic: "${topic}" with the personality trait: "${trait}".`);
      }
      setLoading(false);
    }, 1000); // Simulate network latency
  };

  return (
    <div className="box-card" style={{ marginTop: '20px' }}>
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
          {Object.keys(aiResponses.arrays).map(trait => (
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
    <div className="lessons-hub-container">
      <header className="header">
        <h1>Lessons Hub</h1>
        <p>Choose a lesson to start or continue your learning journey.</p>
      </header>
      <AIAssistant/>
      <section className="lesson-cards-section box-card">
        {mockLessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            {lesson.isCompleted ? (
              <span className="lesson-status completed">Completed</span>
            ) : (
              <Link href={`/lessons/${lesson.slug}`} className="lesson-link">
                Start Lesson
              </Link>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default LessonsHub;
