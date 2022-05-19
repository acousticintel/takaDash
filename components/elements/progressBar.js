import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const progressVar = {
  hide: {
    width: 0,
  },
  show: (w)=>({
    width: `${w + 30}%`,
    transition: {
      delay: 0.01 * w,
      type: "spring",
      mass: 0.8,
      damping: 12,
    },
  }),
};

export default function ProgressBar({ color, value }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const [barColor, setBarColor] = useState("bg-gray-600");
  const [backColor, setBackColor] = useState("bg-gray-200");

  useEffect(() => {
    if (color === "blue") {
      setBarColor("bg-blue-500");
      setBackColor("bg-blue-200");
    } else if (color === "orange") {
      setBarColor("bg-orange-500");
      setBackColor("bg-orange-200");
    } else if (color === "teal") {
      setBarColor("bg-teal-500");
      setBackColor("bg-teal-200");
    } else if (color === "yellow") {
      setBarColor("bg-yellow-500");
      setBackColor("bg-yellow-200");
    } else if (color === "slate") {
      setBarColor("bg-slate-500");
      setBackColor("bg-slate-200");
    } else if (color === "purple") {
      setBarColor("bg-purple-500");
      setBackColor("bg-purple-200");
    } else if (color === "red") {
      setBarColor("bg-red-500");
      setBackColor("bg-red-200");
    } else {
      setBarColor("bg-gray-600");
      setBackColor("bg-gray-200");
    }
  }, [color]);

  return (
    <div
      ref={ref}
      className={`relative m-2 w-full h-1.5 rounded-full ${backColor}`}
    >
      <motion.div
        variants={progressVar}
        initial="hide"
        animate="show"
        custom={value}
        className={`absolute h-2 top-1/2 left-0 -translate-y-1/2 w-1/2 rounded-full ${barColor}`}
      />
    </div>
  );
}
