"use client";

import { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot, doc, getDoc, addDoc, updateDoc, where, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import Link from 'next/link';

// Helper function to get the current user's points
const getMyPoints = async (db, userId) => {
  if (!userId) return 0;
  const userRef = doc(db, "leaderboard", userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data().points : 0;
};

// =======================================================
// DSA Challenge Component
// =======================================================
const dsaProblems = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Write a function to reverse a string without using built-in methods.",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Check for Palindrome",
    description: "Determine if a given string is a palindrome.",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Find Max Element",
    description: "Find the maximum number in a given array of integers.",
    difficulty: "Medium",
  },
];

const DSAChallenge = ({ db, auth, myPoints, setMyPoints }) => {
  const [challenge, setChallenge] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, waiting, in-progress, completed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    if (!db || !userId) return;

    // Listen for changes to a challenge document involving the current user
    const q = query(
      collection(db, "dsaChallenges"),
      where("status", "in", ["waiting", "in-progress"])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc.data();
        if (doc.challengerId === userId || doc.opponentId === userId) {
          setChallenge({ id: change.doc.id, ...doc });
          setStatus(doc.status);
          if (doc.winnerId) {
            setStatus("completed");
            if (doc.winnerId === userId) {
              setMyPoints(myPoints + 100);
            }
          }
        }
      });
    });

    return () => unsubscribe();
  }, [db, userId, myPoints, setMyPoints]);

  const findOrCreateChallenge = async () => {
    if (loading || status !== "idle" || !db || !userId) return;
    setLoading(true);
    setError(null);

    try {
      // Look for an open challenge
      const q = query(collection(db, "dsaChallenges"), where("status", "==", "waiting"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Join an existing challenge
        const openChallengeDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "dsaChallenges", openChallengeDoc.id), {
          opponentId: userId,
          status: "in-progress",
          startedAt: serverTimestamp(),
        });
        setStatus("in-progress");
      } else {
        // Create a new challenge
        const randomProblem = dsaProblems[Math.floor(Math.random() * dsaProblems.length)];
        await addDoc(collection(db, "dsaChallenges"), {
          challengerId: userId,
          opponentId: null,
          problem: randomProblem,
          status: "waiting",
          createdAt: serverTimestamp(),
          winnerId: null,
        });
        setStatus("waiting");
      }
    } catch (e) {
      console.error("Error with challenge:", e);
      setError("Failed to find or create a challenge. Please try again.");
      setStatus("idle");
    } finally {
      setLoading(false);
    }
  };

  const submitSolution = async () => {
    if (status !== "in-progress" || !challenge) return;
    setLoading(true);

    try {
      await updateDoc(doc(db, "dsaChallenges", challenge.id), {
        status: "completed",
        winnerId: userId,
      });
      // The leaderboard listener will handle the point update
    } catch (e) {
      console.error("Error submitting solution:", e);
      setError("Failed to submit solution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-card dsa-challenge-card">
      <h2>1v1 DSA Battle</h2>
      {status === "idle" && (
        <div style={{ textAlign: 'center' }}>
          <p>Ready to challenge a fellow coder?</p>
          <button className="link" onClick={findOrCreateChallenge} disabled={loading}>
            {loading ? "Searching..." : "Find Opponent"}
          </button>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </div>
      )}

      {status === "waiting" && (
        <div style={{ textAlign: 'center' }}>
          <p>Searching for an opponent... <span className="loading-dot">.</span><span className="loading-dot">.</span><span className="loading-dot">.</span></p>
          <p>Your challenge is active. Waiting for a challenger to join.</p>
        </div>
      )}

      {status === "in-progress" && challenge && (
        <div style={{ textAlign: 'center' }}>
          <h3>Battle in Progress!</h3>
          <p>Your opponent has joined. Solve the problem below.</p>
          <div className="problem-statement box-card">
            <h4>{challenge.problem.title}</h4>
            <p>{challenge.problem.description}</p>
            <p className="difficulty">Difficulty: {challenge.problem.difficulty}</p>
          </div>
          <button className="link" onClick={submitSolution} disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? "Submitting..." : "Submit Solution"}
          </button>
        </div>
      )}

      {status === "completed" && challenge && (
        <div style={{ textAlign: 'center' }}>
          <h3>Challenge Complete!</h3>
          {challenge.winnerId === userId ? (
            <p style={{ color: 'var(--accent-1)' }}>You are the winner! 🏆</p>
          ) : (
            <p style={{ color: 'var(--accent-2)' }}>You lost. Better luck next time!</p>
          )}
          <Link href="/rewards" className="link" style={{ marginTop: '1rem' }}>Back to Leaderboard</Link>
        </div>
      )}
    </div>
  );
};


// =======================================================
// Main Rewards Page Component
// =======================================================
const RewardsPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myPoints, setMyPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Manually define the Firebase config object here
  const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  
};

    try {
      // Check if a Firebase app already exists
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const authenticator = getAuth(app);
      setDb(getFirestore(app));
      setAuth(authenticator);

      const unsubscribeAuth = onAuthStateChanged(authenticator, async (user) => {
        if (user) {
          setIsAuthReady(true);
        } else {
          if (process.env.__initial_auth_token) {
            await signInWithCustomToken(authenticator, process.env.__initial_auth_token);
          } else {
            await signInAnonymously(authenticator);
          }
        }
      });

      return () => unsubscribeAuth();

    } catch (e) {
      console.error("Firebase initialization failed:", e);
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    let unsubscribe;
    const setupFirestore = async () => {
      if (!db || !auth || !isAuthReady) return;
      try {
        const userId = auth.currentUser.uid;
        setMyPoints(await getMyPoints(db, userId));

        const q = query(collection(db, "leaderboard"), orderBy("points", "desc"));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const leaderboardData = [];
          let rank = 1;
          querySnapshot.forEach((doc) => {
            leaderboardData.push({ ...doc.data(), id: doc.id, rank: rank++ });
          });
          setLeaderboard(leaderboardData);
          setLoading(false);
        });

      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
        setLoading(false);
      }
    };

    setupFirestore();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [db, auth, isAuthReady, myPoints]);

  return (
    <>
      <style jsx global>{`
        /*
          =======================================================
          Rewards and Leaderboard Styles
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

        .rewards-container {
            padding: 2rem 0;
            max-width: 900px;
            margin: 0 auto;
        }

        .rewards-section, .leaderboard-section {
          margin-top: 2rem;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .badge-card {
          background: var(--card-bg);
          border: 1px solid var(--border-solid);
          border-radius: var(--radius);
          padding: 1rem;
          text-align: center;
          transition: transform 0.3s ease-in-out;
        }
        
        .badge-card:hover {
          transform: translateY(-3px);
        }

        .badge-icon {
          font-size: 2.5rem;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        .leaderboard-table th, .leaderboard-table .highlight-row, .leaderboard-table tr:hover {
          background-color: var(--sober-accent-1);
          color: var(--primary-text);
          font-weight: bold;
        }

        .leaderboard-table th, .leaderboard-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--sober-accent-2);
        }

        .leaderboard-table .highlight-row {
          background-color: var(--accent-1);
          color: var(--primary-bg);
          font-weight: bold;
        }

        .leaderboard-table .highlight-row td {
          color: var(--primary-bg);
          opacity: 1;
        }
      `}</style>
      <div className="rewards-container">
        <header className="header">
          <h1>Rewards & Leaderboard</h1>
          <p>Earn badges and see how you rank among your peers!</p>
        </header>
        
        {isAuthReady && <DSAChallenge db={db} auth={auth} myPoints={myPoints} setMyPoints={setMyPoints} />}

        <section className="rewards-section box-card">
          <h2>Your Rewards</h2>
          <div className="rewards-grid">
            <div className="badge-card">
              <span className="badge-icon">⭐</span>
              <h3>First Lesson</h3>
              <p>Completed your very first lesson.</p>
            </div>
            <div className="badge-card">
              <span className="badge-icon">🎓</span>
              <h3>Quiz Master</h3>
              <p>Scored a perfect 100% on a quiz.</p>
            </div>
            <div className="badge-card">
              <span className="badge-icon">🚀</span>
              <h3>Code Explorer</h3>
              <p>Completed 5 lessons.</p>
            </div>
          </div>
        </section>

        <section className="leaderboard-section box-card">
          <h2>Leaderboard</h2>
          {loading ? (
            <p>Loading leaderboard...</p>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={user.id} className={user.id === auth.currentUser?.uid ? "highlight-row" : ""}>
                    <td>{index + 1}</td>
                    <td>{user.name || "Anonymous"}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
};

export default RewardsPage;
