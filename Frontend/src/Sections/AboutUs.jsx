import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const STATS = [
    { value: '12K+', label: 'Students Enrolled' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '50+', label: 'Expert Instructors' },
    { value: '200+', label: 'Hours of Content' },
];

const VALUES = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Transparency & Trust',
        desc: 'Secure authentication using Twilio OTP verification ensures a safe, trustworthy experience for every learner on the platform.',
        accent: '#60A5FA',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: 'Continuous Innovation',
        desc: 'Built on the MERN stack — React, Node, Express, MongoDB — delivering a scalable, blazing-fast learning environment.',
        accent: '#A78BFA',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Student-Centric Learning',
        desc: 'Personalized mentorship and real-world projects ensure every student builds practical skills and career-ready confidence.',
        accent: '#34D399',
    },
];

function StatCard({ value, label, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                textAlign: 'center',
                padding: '20px 12px',
                borderRadius: '16px',
                background: '#111',
                border: '1px solid #1e1e1e',
            }}
        >
            <div style={{
                fontSize: 'clamp(26px, 4vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Syne', system-ui, sans-serif",
            }}>
                {value}
            </div>
            <div style={{ fontSize: '12px', color: '#555', marginTop: '4px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {label}
            </div>
        </motion.div>
    );
}

function ValueItem({ icon, title, desc, accent, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                padding: '20px',
                borderRadius: '16px',
                background: '#0d0d0d',
                border: '1px solid #1a1a1a',
                transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = accent + '44'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
        >
            <div style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: accent + '18',
                border: `1px solid ${accent}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accent,
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8e8e8', marginBottom: '6px', fontFamily: "'Syne', system-ui, sans-serif" }}>
                    {title}
                </div>
                <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>
                    {desc}
                </div>
            </div>
        </motion.div>
    );
}

const AboutUs = () => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; }`}</style>

            <section id="about-us" style={{
                background: '#080808',
                padding: 'clamp(56px, 8vw, 112px) clamp(16px, 5vw, 80px)',
                fontFamily: "'Syne', system-ui, sans-serif",
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* background glow blobs */}
                <div style={{ position: 'absolute', top: '-120px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, #A78BFA18 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-100px', right: '-60px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, #60A5FA14 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

                    {/* Header */}
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}
                    >
                        <span style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: '#A78BFA',
                            marginBottom: '16px',
                            padding: '5px 14px',
                            border: '1px solid #A78BFA44',
                            borderRadius: '999px',
                            background: '#A78BFA0f',
                        }}>
                            Our Story
                        </span>
                        <h2 style={{
                            margin: '0 0 16px',
                            fontSize: 'clamp(30px, 5vw, 54px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: '#f0f0f0',
                        }}>
                            Who We{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Are
                            </span>
                        </h2>
                        <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: 'clamp(14px, 2vw, 16px)', color: '#555', lineHeight: 1.7 }}>
                            Learn, Code, and Grow with a next-generation Learning Management Platform built for the modern developer.
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '12px',
                        marginBottom: 'clamp(40px, 6vw, 72px)',
                    }}>
                        {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
                    </div>

                    {/* Main Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                        gap: 'clamp(32px, 5vw, 64px)',
                        alignItems: 'center',
                    }}>

                        {/* Image Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{ position: 'relative' }}
                        >
                            {/* decorative frame */}
                            <div style={{
                                position: 'absolute',
                                inset: '-12px',
                                borderRadius: '28px',
                                border: '1px solid #A78BFA22',
                                pointerEvents: 'none',
                            }} />
                            <div style={{
                                borderRadius: '20px',
                                overflow: 'hidden',
                                aspectRatio: '4/3',
                                position: 'relative',
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1000&q=80"
                                    alt="Students learning online at StackAcademy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                                {/* overlay tint */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(135deg, #A78BFA22 0%, transparent 60%)',
                                }} />
                            </div>

                            {/* floating badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '-18px',
                                    left: '24px',
                                    background: '#111',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '14px',
                                    padding: '12px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                                }}
                            >
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8e8e8' }}>MERN Stack</div>
                                    <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>Powered Platform</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Text Column */}
                        <div style={{ paddingTop: '12px' }}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 style={{
                                    margin: '0 0 16px',
                                    fontSize: 'clamp(22px, 3vw, 32px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    color: '#f0f0f0',
                                    lineHeight: 1.2,
                                }}>
                                    Our Mission &{' '}
                                    <span style={{
                                        background: 'linear-gradient(135deg, #60A5FA, #34D399)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>
                                        Vision
                                    </span>
                                </h3>

                                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8, marginBottom: '28px' }}>
                                    StackAcademy is a modern e-learning platform designed to empower students in mastering Full Stack Development through interactive learning, real-world projects, and personalized mentorship. We make tech education accessible, engaging, and industry-focused.
                                </p>
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {VALUES.map((v, i) => (
                                    <ValueItem key={v.title} {...v} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AboutUs;