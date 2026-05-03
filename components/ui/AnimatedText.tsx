"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  charDelay?: number;
  splitBy?: "char" | "word";
  duration?: number;
  inView?: boolean;
};

export function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  charDelay = 0.03,
  splitBy = "char",
  duration = 0.7,
  inView = true,
}: Props) {
  const reduce = useReducedMotion();
  const items = splitBy === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduce ? 0 : delay,
        staggerChildren: reduce ? 0 : charDelay,
      },
    },
  };

  const child: Variants = {
    hidden: reduce ? { opacity: 1, y: "0%" } : { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0 : duration, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const Wrapper = motion[Tag];

  return (
    <Wrapper
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-block overflow-hidden align-baseline"
          aria-hidden="true"
          style={{ paddingBottom: "0.18em" }}
        >
          <motion.span
            className="inline-block"
            variants={child}
            style={{ willChange: "transform" }}
          >
            {item === " " ? " " : item}
            {splitBy === "word" && i < items.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
