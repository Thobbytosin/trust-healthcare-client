"use client";
import { Variants, motion } from "framer-motion";
import { FC, ReactNode } from "react";

type RevealWrapperProps = {
  children: ReactNode;
  variants?: Variants;
  animate?: boolean;
};

// Animation Variants
const defaultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation Variants
export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const RevealWrapper: FC<RevealWrapperProps> = ({
  children,
  variants = defaultVariants,
  animate = false,
}) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView={animate ? undefined : "visible"}
      animate={animate ? "visible" : undefined}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default RevealWrapper;
