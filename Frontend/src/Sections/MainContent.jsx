import React from 'react';

// CourseCard Component - Represents a single course card
const CourseCard = ({ course }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full transform transition-all duration-300 hover:scale-105 hover:shadow-glow border border-gray-700">
      {/* Course Image/Placeholder */}
      <img
        src={course.imageUrl || `https://placehold.co/400x200/2a2a2a/ffffff?text=${course.title.replace(/\s/g, '+')}`}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/2a2a2a/ffffff?text=${course.title.replace(/\s/g, '+')}` }}
      />

      {/* Course Title */}
      <h3 className="text-2xl font-bold text-black mb-2">{course.title}</h3>

      {/* Course Description */}
      <p className="text-gray-800 text-sm mb-4 line-clamp-3">{course.description}</p>

      {/* Course Details (e.g., Duration, Instructor) */}
      <div className="flex justify-between items-center text-gray-600 text-xs mb-4">
        <span><i className="lucide lucide-clock mr-1"></i> {course.duration}</span>
        <span><i className="lucide lucide-user mr-1"></i> {course.instructor}</span>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-semibold text-green-400">{course.price}</span>
        <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

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
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
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
