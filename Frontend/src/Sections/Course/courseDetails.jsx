import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import courses from "../../data/courses";

const ACCENT_PAIRS = [
  { from: "#FF6B6B", to: "#FF8E53" },
  { from: "#4ECDC4", to: "#44B89E" },
  { from: "#A78BFA", to: "#7C3AED" },
  { from: "#F59E0B", to: "#D97706" },
  { from: "#34D399", to: "#059669" },
  { from: "#60A5FA", to: "#2563EB" },
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < full ? "#F59E0B" : i === full && half ? "url(#half)" : "none"} stroke="#F59E0B" strokeWidth="1.5">
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#F59E0B" /><stop offset="50%" stopColor="transparent" /></linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function RelatedCard({ course, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_PAIRS[index % ACCENT_PAIRS.length];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "#0f0f0f",
        border: `1px solid ${hovered ? accent.from + "44" : "#1e1e1e"}`,
        cursor: "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 12px 40px ${accent.from}22` : "none",
      }}
    >
      <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
        <img
          src={course.imageUrl || `https://placehold.co/600x360/111/333?text=${encodeURIComponent(course.title)}`}
          alt={course.title}
          onError={(e) => { e.currentTarget.src = `https://placehold.co/600x360/111/333?text=${encodeURIComponent(course.title)}`; }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, #0f0f0f 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }} />
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#e8e8e8", marginBottom: "4px", fontFamily: "'Syne', system-ui, sans-serif" }}>{course.title}</div>
        <div style={{ fontSize: "12px", color: "#555" }}>{course.instructor}</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: accent.from, marginTop: "8px" }}>{course.price}</div>
      </div>
    </motion.div>
  );
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(courseId));
  const courseIndex = courses.findIndex((c) => c.id === parseInt(courseId));
  const accent = ACCENT_PAIRS[courseIndex % ACCENT_PAIRS.length];

  const highlights = course?.highlights || [
    `Understand fundamentals of ${course?.title}`,
    "Hands-on projects and real-world assignments",
    "Industry best practices and patterns",
    "Access to resources & community support",
  ];

  const categories = course?.categories || ["General"];
  const rating = course?.rating || 4.5;
  const reviews = course?.reviews?.length || 120;

  // ── Not Found ─────────────────────────────────────────────
  if (!course) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');`}</style>
        <div style={{ minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", fontFamily: "'Syne', system-ui, sans-serif" }}>
          <div style={{ fontSize: "64px", fontWeight: 800, color: "#1a1a1a" }}>404</div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#e8e8e8" }}>Course Not Found</div>
          <button onClick={() => navigate("/courses")} style={{ padding: "10px 24px", borderRadius: "999px", background: "linear-gradient(135deg, #A78BFA, #7C3AED)", border: "none", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "'Syne', system-ui, sans-serif" }}>
            Back to Courses
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; }`}</style>

      <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'Syne', system-ui, sans-serif", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        {/* bg glows */}
        <div style={{ position: "fixed", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${accent.from}10 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${accent.to}0c 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 40px) 0", position: "relative", zIndex: 1 }}>

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#444", marginBottom: "28px" }}>
            <span onClick={() => navigate("/courses")} style={{ cursor: "pointer", color: "#666", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = accent.from} onMouseLeave={e => e.target.style.color = "#666"}>
              Courses
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span style={{ color: "#888" }}>{course.title}</span>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ borderRadius: "20px", overflow: "hidden", position: "relative", aspectRatio: "16/7" }}
          >
            <img
              src={course.imageUrl || `https://placehold.co/1200x500/111/333?text=${encodeURIComponent(course.title)}`}
              alt={course.title}
              onError={(e) => { e.currentTarget.src = `https://placehold.co/1200x500/111/333?text=${encodeURIComponent(course.title)}`; }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 30%, #080808 100%)` }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent.from}18 0%, transparent 60%)` }} />
            {/* bottom accent line */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }} />
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}
          >
            <div style={{ flex: 1, minWidth: "260px" }}>
              {/* categories */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                {categories.map((cat, i) => (
                  <span key={i} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent.from, background: accent.from + "18", border: `1px solid ${accent.from}33`, padding: "3px 10px", borderRadius: "999px" }}>
                    {cat}
                  </span>
                ))}
              </div>
              <h1 style={{ margin: "0 0 10px", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#f0f0f0", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                {course.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#888" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent.from} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  {course.instructor}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#888" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent.from} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {course.duration}
                </div>
              </div>
            </div>

            {/* Price + CTA */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", minWidth: "160px" }}>
              <div style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.03em" }}>
                {course.price}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => alert("Enroll feature coming soon!")}
                style={{
                  padding: "12px 28px",
                  borderRadius: "12px",
                  border: "none",
                  background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Syne', system-ui, sans-serif",
                  boxShadow: `0 8px 24px ${accent.from}44`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Enroll Now
              </motion.button>
            </div>
          </motion.div>

          {/* Rating bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px", padding: "14px 18px", background: "#0d0d0d", borderRadius: "12px", border: "1px solid #1a1a1a", flexWrap: "wrap" }}
          >
            <StarRating rating={rating} />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#F59E0B" }}>{rating}</span>
            <span style={{ fontSize: "13px", color: "#555" }}>({reviews.toLocaleString()} reviews)</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[["Students", course.students || "2,400+"], ["Level", course.level || "Beginner"]].map(([k, v]) => (
                <div key={k} style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "#444", letterSpacing: "0.06em", textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#ccc" }}>{v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Two-column body */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(24px, 4vw, 40px)", marginTop: "36px" }}>

            {/* Description */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionHeading accent={accent.from}>About this course</SectionHeading>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.85, marginTop: "14px" }}>{course.description}</p>
            </motion.div>

            {/* What you'll learn */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionHeading accent={accent.from}>What you'll learn</SectionHeading>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {highlights.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "#999", lineHeight: 1.6 }}
                  >
                    <CheckIcon color={accent.from} />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e1e1e, transparent)", margin: "48px 0" }} />

          {/* Related Courses */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <SectionHeading accent={accent.from}>Related Courses</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "16px", marginTop: "20px" }}>
              {courses
                .filter((c) => c.id !== course.id)
                .slice(0, 3)
                .map((related, i) => (
                  <RelatedCard
                    key={related.id}
                    course={related}
                    index={i}
                    onClick={() => navigate(`/courseDetails/${related.id}`)}
                  />
                ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

function SectionHeading({ children, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ width: "3px", height: "20px", borderRadius: "2px", background: `linear-gradient(180deg, ${accent}, transparent)` }} />
      <h2 style={{ margin: 0, fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 700, color: "#e8e8e8", letterSpacing: "-0.02em" }}>{children}</h2>
    </div>
  );
}

export default CourseDetails;