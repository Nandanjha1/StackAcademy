import React from 'react';

const AboutUs = () => {
    return (
        // Main container for the About Us section
        <section id="about-us" className="py-16 md:py-24 bg-stack-dark">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-blue-400 sm:text-5xl">
                        About Us
                    </h2>
                    <p className="mt-4 text-xl text-gray-200">
                        Learn, Code, and Grow with a next-generation Learning Management Platform.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Image */}
                    <div className="lg:order-2">
                        <div className="bg-blue-200 h-64 md:h-96 rounded-xl shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1000&q=80"
                                alt="Students learning online at StackAcademy"
                                className="w-full h-full object-cover transform hover:scale-105 transition duration-500 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Right Column: Mission, Vision, Values */}
                    <div className="lg:order-1">
                        <h3 className="text-3xl font-bold text-blue-400 mb-6">
                            Our Mission & Vision
                        </h3>

                        <p className="text-lg text-gray-200 leading-relaxed mb-8">
                            StackAcademy is a modern e-learning platform built with the <strong>MERN Stack</strong>,
                            designed to empower students in mastering "Full Stack Development" through
                            interactive learning, real-world projects, and personalized mentorship.
                            We aim to make tech education accessible, engaging, and industry-focused.
                        </p>

                        {/* Values List */}
                        <dl className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.21a12.01 12.01 0 00-3.61 0m-8 0a12.01 12.01 0 00-3.61 0m-2.5 12h14a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg font-medium text-gray-200">
                                        Transparency & Trust
                                    </dt>
                                    <dd className="mt-1 text-base text-gray-100">
                                        We ensure transparent learning and secure authentication using <strong>Twilio OTP verification</strong> for a safe user experience.
                                    </dd>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg font-medium text-gray-200">
                                        Continuous Innovation
                                    </dt>
                                    <dd className="mt-1 text-base text-gray-100">
                                        We leverage the latest tools like <strong>React.js, Node.js, Express.js, MongoDB</strong> to provide a scalable and fast learning experience.
                                    </dd>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20a4 4 0 100-8 4 4 0 000 8zm-8 4h16c-1.5-4-6-6-8-6s-6.5 2-8 6z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg font-medium text-gray-200">
                                        Student-Centric Learning
                                    </dt>
                                    <dd className="mt-1 text-base text-gray-300">
                                        Our focus is on personalized guidance, ensuring every student gains practical coding skills and builds career-ready confidence.
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
