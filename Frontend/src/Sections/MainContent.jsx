import React from 'react';
import { motion } from "motion/react";

// Animation variants
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

// Styles
const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};

const splash = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card = {
  fontSize: 24,
  width: 300,
  height: 430,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
  padding: 24,
};

// Animated Course Card
function AnimatedCourseCard({ course, i, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants} className="card">
        <img
          src={course.imageUrl || `https://placehold.co/400x200/2a2a2a/ffffff?text=${course.title.replace(/\s/g, '+')}`}
          alt={course.title}
          className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/400x200/2a2a2a/ffffff?text=${course.title.replace(/\s/g, '+')}` }}
        />
        <h3 className="text-2xl font-bold text-black mb-2">{course.title}</h3>
        <p className="text-gray-800 text-sm mb-4 line-clamp-3">{course.description}</p>
        <div className="flex justify-between items-center text-gray-600 text-xs mb-4 w-full">
          <span>⏱️ {course.duration}</span>
          <span>👨‍🏫 {course.instructor}</span>
        </div>
        <div className="flex justify-between items-center mt-auto w-full">
          <span className="text-xl font-semibold text-green-400">{course.price}</span>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300">
            Learn More
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const courseHues = [
  [340, 10],
  [20, 40],
  [60, 90],
  [80, 120],
  [100, 140],
  [205, 245],
];

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the fundamentals of React.js, including components, state, props, and hooks. Build your first interactive web application.",
      imageUrl: "../images/react.png",
      duration: "8 Weeks",
      instructor: "Nandan Kumar",
      price: "₹49"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Dive deep into modern JavaScript features, asynchronous programming, ES6+, and design patterns for robust applications.",
      imageUrl: "https://placehold.co/400x200/F7DF1E/000000?text=JS+Course",
      duration: "6 Weeks",
      instructor: "Nandan Kumar",
      price: "₹39"
    },
    {
      id: 3,
      title: "Tailwind CSS Masterclass",
      description: "Master the utility-first CSS framework, Tailwind CSS, to rapidly build beautiful and responsive user interfaces.",
      imageUrl: "https://placehold.co/400x200/38B2AC/000000?text=Tailwind+CSS",
      duration: "4 Weeks",
      instructor: "Nandan Kumar",
      price: "₹9"
    },
    {
      id: 4,
      title: "Node.js & Express API",
      description: "Build powerful backend APIs using Node.js and the Express framework. Learn about routing, middleware, and database integration.",
      imageUrl: "https://placehold.co/400x200/68A063/000000?text=Node.js+API",
      duration: "10 Weeks",
      instructor: "Nandan Kumar",
      price: "₹29"
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "An extensive course covering Python basics, data manipulation with Pandas, numerical computing with NumPy, and data visualization.",
      imageUrl: "../images/python.png",
      duration: "12 Weeks",
      instructor: "Nandan Kumar",
      price: "₹99"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      description: "Understand the core principles of User Interface (UI) and User Experience (UX) design to create intuitive and engaging products.",
      imageUrl: "https://placehold.co/400x200/FF5733/FFFFFF?text=UI/UX+Design",
      duration: "7 Weeks",
      instructor: "Nandan Kumar",
      price: "₹79"
    }
  ];

  return (
    <section className="relative z-10 py-16 px-4 md:px-8 lg:px-16 text-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-lg">
        Explore Our Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {courses.map((course, i) => (
          <AnimatedCourseCard
            key={course.id}
            course={course}
            i={i}
            hueA={courseHues[i % courseHues.length][0]}
            hueB={courseHues[i % courseHues.length][1]}
          />
        ))}
      </div>
    </section>
  );
};

const MainContent = () => {
  return (
    <div className='relative w-full min-h-screen overflow-hidden my-10'>
      <CoursesSection />
    </div>
  );
};

export default MainContent;