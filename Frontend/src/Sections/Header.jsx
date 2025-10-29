import React, { useEffect, useState } from 'react';

const images = [
  "/images/header1.jpg",
  "/images/header2.jpg",
  "/images/header3.jpg"
];

const HeaderSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center transition-all duration-1000 ease-in-out mt-16"
      style={{
        backgroundImage: `url(${images[current]})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-300 mb-4">
          Empower Your Tech Journey with StackAcademy
        </h1>
        <p className="text-lg md:text-xl text-emerald-300 max-w-2xl">
          Learn full-stack development, master coding skills, and build real-world projects with expert-led courses designed for tech students. Start learning today and shape your future in tech.
        </p>
      </div>
    </div>
  );
};

export default HeaderSlider;
