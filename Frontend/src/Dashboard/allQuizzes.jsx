const allQuizzes = [
    {
        id: 1,
        title: "React Basics Quiz",
        questions: 10,
        timeLimit: 15,
        attempts: 3,
        details: {
            questions: [
                {
                    question: "Which of these is a JavaScript framework?",
                    options: ["React", "Django", "Flask", "Laravel"],
                    answer: 0,
                },
                {
                    question: "What is ReactJs?",
                    options: ["Library", "Framework", "Language", "Database"],
                    answer: 0,
                },
                {
                    question: "What is JSX?",
                    options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS preprocessor", "A database language"],
                    answer: 1,
                },
                {
                    question: "What is the purpose of the 'useState' hook?",
                    options: ["To fetch data from an API", "To manage state in functional components", "To handle side effects", "To create a context provider"],
                    answer: 1,
                },
                {
                    question: "How do you pass data from a parent component to a child component?",
                    options: ["Using props", "Using state", "Using a reducer", "Using a context"],
                    answer: 0,
                },
                {
                    question: "What is a component in React?",
                    options: ["A JavaScript function or class that returns a React element", "A CSS file", "A type of database", "A server-side script"],
                    answer: 0,
                },
                {
                    question: "Which hook is used for handling side effects like data fetching and subscriptions?",
                    options: ["useContext", "useState", "useEffect", "useReducer"],
                    answer: 2,
                },
                {
                    question: "What does the 'key' prop do in a list of elements?",
                    options: ["It styles the element", "It identifies a unique element and helps with rendering performance", "It makes the element clickable", "It sets the element's class name"],
                    answer: 1,
                },
                {
                    question: "What is the Virtual DOM?",
                    options: ["A real DOM that is faster", "A lightweight copy of the real DOM", "A server-side rendering method", "A new type of CSS"],
                    answer: 1,
                },
                {
                    question: "How do you handle user input in a React form?",
                    options: ["Using the 'document.querySelector' method", "Using controlled components with state", "Using direct DOM manipulation", "Using a Redux store"],
                    answer: 1,
                },
            ],
        },
    },
    {
        id: 2,
        title: "Node.js Fundamentals Quiz",
        questions: 8,
        timeLimit: 10,
        attempts: 2,
        details: {
            questions: [
                {
                    question: "What is Node.js primarily used for?",
                    options: ["Client-side scripting", "Server-side scripting", "Styling websites", "Database management"],
                    answer: 1,
                },
                {
                    question: "What package manager is commonly used with Node.js?",
                    options: ["npm", "pip", "composer", "gem"],
                    answer: 0,
                },
                {
                    question: "Which JavaScript engine does Node.js use?",
                    options: ["SpiderMonkey", "V8", "JavaScriptCore", "Chakra"],
                    answer: 1,
                },
                {
                    question: "What is the core concept of Node.js's I/O model?",
                    options: ["Synchronous and blocking", "Synchronous and non-blocking", "Asynchronous and blocking", "Asynchronous and non-blocking"],
                    answer: 3,
                },
                {
                    question: "What does 'npm' stand for?",
                    options: ["Node Package Manager", "New Project Manager", "Node Programming Module", "None of the above"],
                    answer: 0,
                },
                {
                    question: "Which global object in Node.js is similar to the 'window' object in browsers?",
                    options: ["global", "document", "this", "console"],
                    answer: 0,
                },
                {
                    question: "What is the primary function of the 'require()' statement in Node.js?",
                    options: ["To start a server", "To import modules", "To declare a variable", "To export a function"],
                    answer: 1,
                },
                {
                    question: "Which module is essential for creating a web server in Node.js?",
                    options: ["path", "fs", "http", "os"],
                    answer: 2,
                },
            ],
        },
    },
];

export default allQuizzes;