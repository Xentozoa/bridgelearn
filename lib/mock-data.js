// lib/mock-data.js

export const mockUserData = {
  name: "Learner",
  lessonsCompleted: 5,
  totalLessons: 10,
  quizzesTaken: 8,
  rewardsEarned: 3,
};

export const mockLessons = [
  {
    id: 1,
    title: "Introduction to Variables",
    description: "Learn the fundamentals of variables in programming.",
    slug: "intro-to-variables",
    isCompleted: true,
    content: [
      { type: "heading", text: "What are Variables?" },
      { type: "paragraph", text: "In programming, a variable is like a container for storing data. Think of it as a labeled box where you can put different items, like numbers or text." },
      { type: "code", text: "let age = 30;" },
      { type: "paragraph", text: "In this example, 'age' is the variable name, and '30' is the value stored inside. The 'let' keyword is a way to declare the variable in JavaScript." },
    ],
  },
  {
    id: 2,
    title: "Understanding Data Types",
    description: "Explore different types of data, such as numbers, strings, and booleans.",
    slug: "understanding-data-types",
    isCompleted: false,
    content: [
      { type: "heading", text: "Common Data Types" },
      { type: "paragraph", text: "Data types classify what kind of value a variable can hold. Common types include:" },
      { type: "list", items: [
        "String: Text, like 'hello world'.",
        "Number: Integers and decimals, like 10 or 3.14.",
        "Boolean: True or False values.",
      ]},
      { type: "paragraph", text: "Knowing the data type is crucial because it determines what operations you can perform on a variable." },
    ],
  },
  {
    id: 3,
    title: "Basic Operations",
    description: "Learn how to perform arithmetic and logical operations.",
    slug: "basic-operations",
    isCompleted: false,
    content: [], // Empty for now, to show it's incomplete
  },
];

export const mockQuizzes = [
  {
    id: 1,
    title: "Variables Quiz",
    description: "Test your knowledge of variables.",
    questions: [
      {
        text: "What is a variable in programming?",
        options: [
          "A command that prints text to the screen.",
          "A container for storing data.",
          "A type of loop.",
          "A programming language.",
        ],
        correctAnswer: "A container for storing data.",
      },
      {
        text: "What keyword is used to declare a variable in JavaScript?",
        options: [
          "var",
          "const",
          "let",
          "All of the above.",
        ],
        correctAnswer: "All of the above.",
      },
    ],
  },
  {
    id: 2,
    title: "Data Types Quiz",
    description: "Check your understanding of common data types.",
    questions: [
        {
            text: "What is the data type of the value `3.14`?",
            options: [
                "String",
                "Boolean",
                "Number",
                "Array",
            ],
            correctAnswer: "Number",
        },
        {
            text: "Which of the following is a boolean value?",
            options: [
                "`'hello'`",
                "`100`",
                "`true`",
                "`['a', 'b']`",
            ],
            correctAnswer: "`true`",
        },
    ],
  },
  {
    id: 3,
    title: "Basic Operations Quiz",
    description: "Learn how to perform arithmetic and logical operations.",
    questions: [
        {
            text: "What is the result of `5 + '5'` in JavaScript?",
            options: [
                "10",
                "55",
                "Error",
                "Undefined",
            ],
            correctAnswer: "55",
        },
        {
            text: "What is the value of `5 > 3 && 2 < 4`?",
            options: [
                "true",
                "false",
                "5",
                "3",
            ],
            correctAnswer: "true",
        },
    ],
  },
];

export const mockLeaderboard = [
  { rank: 1, name: "Alice", points: 1250 },
  { rank: 2, name: "Bob", points: 1100 },
  { rank: 3, name: "Charlie", points: 950 },
  { rank: 4, name: "Diana", points: 880 },
  { rank: 5, name: "You", points: 800 },
];
