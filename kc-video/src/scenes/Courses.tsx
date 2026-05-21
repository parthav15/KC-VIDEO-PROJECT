import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FullBleedPhoto } from "../components/FullBleedPhoto";
import { BrandBug } from "../components/Monogram";
import { Eyebrow, Reveal } from "../components/Reveal";
import { textShadowStrong } from "../components/TextShadow";
import { palette } from "../theme";

type Course = { name: string; category: string; glyph: string };

const courses: Course[] = [
  { name: "Hotel Management", category: "Hospitality", glyph: "01" },
  { name: "Allied Healthcare", category: "Health Sciences", glyph: "02" },
  { name: "Pharmacy", category: "Health Sciences", glyph: "03" },
  { name: "Engineering", category: "Tech & Innovation", glyph: "04" },
  { name: "Polytechnic", category: "Tech & Innovation", glyph: "05" },
  { name: "Management", category: "Business", glyph: "06" },
  { name: "BBA · BCA · B.Com", category: "Business · Computing", glyph: "07" },
  { name: "Fashion Designing", category: "Creative Arts", glyph: "08" },
  { name: "Beauty Therapy", category: "Wellness", glyph: "09" },
  { name: "Ayurveda", category: "Health · Heritage", glyph: "10" },
  { name: "B.Ed · NTT", category: "Education", glyph: "11" },
  { name: "Artificial Intelligence", category: "Future Forward", glyph: "12" },
];

const HEADER_FRAMES = 36;
const PAGE_FRAMES = 88;
const CARDS_PER_PAGE = 3;

const CourseCard: React.FC<{
  course: Course;
  index: number;
  pageStart: number;
  isHero?: boolean;
}> = ({ course, index, pageStart, isHero = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stagger = pageStart + index * 2;
  const enter = spring({
    frame: frame - stagger,
    fps,
    config: { damping: 22, stiffness: 200, mass: 0.6 },
  });
  const exit = interpolate(
    frame,
    [pageStart + PAGE_FRAMES - 7, pageStart + PAGE_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = enter * exit;
  const tx = interpolate(enter, [0, 1], [-28, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${tx}px)`,
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "26px 32px",
        background: isHero
          ? "linear-gradient(135deg, rgba(214,52,64,0.34) 0%, rgba(160,36,48,0.14) 100%)"
          : "linear-gradient(135deg, rgba(10,21,48,0.65) 0%, rgba(3,6,26,0.45) 100%)",
        borderRadius: 18,
        border: `1px solid ${isHero ? "rgba(214,52,64,0.7)" : palette.hairline}`,
        backdropFilter: "blur(14px)",
        boxShadow: isHero
          ? "0 10px 40px rgba(214,52,64,0.35)"
          : "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          fontFamily: "Fraunces, serif",
          fontStyle: "italic",
          fontSize: 36,
          color: isHero ? palette.gold : palette.goldLight,
          minWidth: 64,
          lineHeight: 1,
          fontWeight: 400,
        }}
      >
        {course.glyph}
      </div>
      <div
        style={{
          width: 1,
          height: 48,
          background: isHero ? palette.gold : palette.hairline,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            color: palette.ivory,
            fontFamily: "Fraunces, serif",
            fontSize: 34,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: -0.4,
          }}
        >
          {course.name}
        </div>
        <div
          style={{
            color: isHero ? palette.gold : palette.ivorySoft,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {course.category}
        </div>
      </div>
    </div>
  );
};

export const Courses: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const exitOpacity = interpolate(frame, [duration - 6, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pages: Course[][] = [];
  for (let i = 0; i < courses.length; i += CARDS_PER_PAGE) {
    pages.push(courses.slice(i, i + CARDS_PER_PAGE));
  }

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <FullBleedPhoto
        src="images/hostel-courtyard.jpeg"
        duration={duration}
        zoomFrom={1.12}
        zoomTo={1.22}
        position="50% 50%"
        overlay="linear-gradient(180deg, rgba(4,10,34,0.45) 0%, rgba(4,10,34,0.62) 60%, rgba(4,10,34,0.82) 100%)"
        filter="saturate(1.15) contrast(1.05) brightness(0.72)"
      />
      <BrandBug />

      <div
        style={{
          position: "absolute",
          top: 240,
          left: 70,
          right: 70,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <Eyebrow text="Career-focused programs" delay={0} textShadow={textShadowStrong} />
        <Reveal
          text="A course for"
          delay={4}
          size={76}
          family="display"
          weight={400}
          color={palette.ivory}
          letterSpacing={-1.4}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
        <Reveal
          text="every ambition."
          delay={12}
          size={76}
          family="displayItalic"
          weight={400}
          color={palette.gold}
          letterSpacing={-1.4}
          lineHeight={0.95}
          textShadow={textShadowStrong}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 700,
          left: 70,
          right: 70,
          bottom: 180,
        }}
      >
        {pages.map((page, pageIdx) => {
          const pageStart = HEADER_FRAMES + pageIdx * PAGE_FRAMES;
          const pageVisible =
            frame >= pageStart - 4 && frame < pageStart + PAGE_FRAMES + 4;
          if (!pageVisible) return null;
          return (
            <div
              key={pageIdx}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {page.map((course, idx) => (
                <CourseCard
                  key={course.name}
                  course={course}
                  index={idx}
                  pageStart={pageStart}
                  isHero={course.name === "Artificial Intelligence"}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 95,
          left: 0,
          right: 0,
          textAlign: "center",
          color: palette.ivorySoft,
          fontFamily: "Inter, sans-serif",
          fontSize: 16,
          letterSpacing: 5,
          textTransform: "uppercase",
          fontWeight: 600,
          opacity: 0.75,
          textShadow: textShadowStrong,
        }}
      >
        12+ programs  ·  2 campuses  ·  Punjab + HP
      </div>
    </AbsoluteFill>
  );
};
