import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from 'react-router-dom';
import courses from '../data/courses';

// ─── Palette ────────────────────────────────────────────────
const ACCENT_PAIRS = [
  { from: '#FF6B6B', to: '#FF8E53', text: '#fff' },
  { from: '#4ECDC4', to: '#44B89E', text: '#fff' },
  { from: '#A78BFA', to: '#7C3AED', text: '#fff' },
  { from: '#F59E0B', to: '#D97706', text: '#fff' },
  { from: '#34D399', to: '#059669', text: '#fff' },
  { from: '#60A5FA', to: '#2563EB', text: '#fff' },
];

// ─── Tag Badge ───────────────────────────────────────────────
function TagBadge({ label, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: `${color}22`,
      color: color,
      border: `1px solid ${color}44`,
    }}>
      {label}
    </span>
  );
}

// ─── Course Card ─────────────────────────────────────────────
function CourseCard({ course, index }) {
  const navigate = useNavigate();
  const accent = ACCENT_PAIRS[index % ACCENT_PAIRS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#0f0f0f',
        border: `1px solid ${hovered ? accent.from + '55' : '#222'}`,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
        boxShadow: hovered
          ? `0 20px 60px -10px ${accent.from}33, 0 0 0 1px ${accent.from}22`
          : '0 4px 24px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onClick={() => navigate(`/courseDetails/${course.id}`)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden', flexShrink: 0 }}>
        <motion.img
          src={course.imageUrl || `https://placehold.co/600x360/111111/444444?text=${encodeURIComponent(course.title)}`}
          alt={course.title}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/600x360/111111/444444?text=${encodeURIComponent(course.title)}`; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 30%, #0f0f0f 100%)`,
        }} />
        {/* accent bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
        }} />
        {/* price pill */}
        <div style={{
          position: 'absolute',
          top: '12px', right: '12px',
          padding: '5px 12px',
          borderRadius: '999px',
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          color: accent.text,
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.02em',
          boxShadow: `0 4px 12px ${accent.from}55`,
        }}>
          {course.price}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {course.category && <TagBadge label={course.category} color={accent.from} />}
          {course.level && <TagBadge label={course.level} color="#888" />}
        </div>

        {/* Title */}
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(15px, 2vw, 17px)',
          fontWeight: 700,
          color: '#f0f0f0',
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
          fontFamily: "'Syne', 'Georgia', serif",
        }}>
          {course.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#888',
          lineHeight: 1.65,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {course.description}
        </p>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          gap: '12px',
          fontSize: '12px',
          color: '#666',
          borderTop: '1px solid #1e1e1e',
          paddingTop: '10px',
          marginTop: 'auto',
          flexWrap: 'wrap',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent.from} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent.from} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            {course.instructor}
          </span>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { e.stopPropagation(); navigate(`/courseDetails/${course.id}`); }}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: '12px',
            border: 'none',
            background: hovered
              ? `linear-gradient(135deg, ${accent.from}, ${accent.to})`
              : 'transparent',
            color: hovered ? accent.text : '#666',
            border: hovered ? 'none' : `1px solid #2a2a2a`,
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            textTransform: 'uppercase',
          }}
        >
          Enroll Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  );
}

// ─── Filter Tab ───────────────────────────────────────────────
function FilterTab({ label, active, onClick, count }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        padding: '7px 16px',
        borderRadius: '999px',
        border: active ? 'none' : '1px solid #2a2a2a',
        background: active ? 'linear-gradient(135deg, #A78BFA, #7C3AED)' : 'transparent',
        color: active ? '#fff' : '#666',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
      {count != null && (
        <span style={{
          fontSize: '11px',
          background: active ? 'rgba(255,255,255,0.25)' : '#222',
          color: active ? '#fff' : '#555',
          padding: '1px 6px',
          borderRadius: '999px',
        }}>
          {count}
        </span>
      )}
    </motion.button>
  );
}

// ─── Main Section ─────────────────────────────────────────────
const CoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];
  const filtered = activeFilter === 'All'
    ? courses
    : courses.filter(c => c.category === activeFilter);

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section style={{
        minHeight: '100vh',
        background: '#080808',
        padding: 'clamp(48px, 8vw, 100px) clamp(16px, 4vw, 80px)',
        fontFamily: "'Syne', system-ui, sans-serif",
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 64px)' }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: '16px',
            padding: '5px 14px',
            border: '1px solid #A78BFA44',
            borderRadius: '999px',
            background: '#A78BFA11',
          }}>
            Level Up Your Skills
          </span>
          <h1 style={{
            margin: '0 0 16px',
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#f0f0f0',
          }}>
            Explore Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Courses
            </span>
          </h1>
          <p style={{
            margin: '0 auto',
            maxWidth: '500px',
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#555',
            lineHeight: 1.7,
          }}>
            Curated learning paths designed to get you from zero to job-ready — fast.
          </p>
        </motion.div>

        {/* Filters */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'clamp(24px, 4vw, 48px)',
            }}
          >
            {categories.map(cat => (
              <FilterTab
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                count={cat === 'All' ? courses.length : courses.filter(c => c.category === cat).length}
              />
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(16px, 2.5vw, 28px)',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: '#444', padding: '60px 0', fontSize: '15px' }}
          >
            No courses found in this category.
          </motion.div>
        )}
      </section>
    </>
  );
};

const MainContent = () => (
  <div style={{ width: '100%', minHeight: '100vh' }}>
    <CoursesSection />
  </div>
);

export default MainContent;