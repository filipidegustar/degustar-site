import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      initial={{ opacity: 0, y }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}