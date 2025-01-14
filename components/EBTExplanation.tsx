"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import { Sun, Wind, Zap } from "lucide-react";
import Image from "next/image";

interface DecorativeElement {
  className: string;
  animation: any; 
  transition: any; 
  icon: JSX.Element;
}

const decorativeElements: DecorativeElement[] = [
  {
    className:
      "absolute lg:top-20 sm:top-72 lg:left-20 left-10 top-1 text-yellow-400 opacity-70",
    animation: { rotate: 360, scale: [4.5, 4.3, 4.5] },
    transition: { duration: 10, repeat: Infinity, ease: "linear" },
    icon: <Sun size={24} className="w-2 lg:w-32" />,
  },
  {
    className:
      "absolute lg:top-10 top-4 right-20 lg:right-16 text-blue-400 opacity-70",
    animation: { x: [-8, 8, -8], y: [-4, 4, -4], scale: [2, 2.3, 2] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    icon: <Wind size={20} className="w-2 lg:w-20" />,
  },
  {
    className:
      "absolute lg:top-32 top-12 lg:right-32 right-4 text-blue-400 opacity-70",
    animation: { x: [-8, 8, -8], y: [-4, 4, -4], scale: [2, 1.8, 2] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    icon: <Wind size={20} className="w-4 lg:w-24" />,
  },
  {
    className:
      "absolute lg:bottom-32 lg:left-20 bottom-10 left-6 text-green-400 opacity-70",
    animation: { scale: [2.5, 2, 2.5] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    icon: <Zap size={18} className="w-5 lg:w-10" />,
  },
  {
    className:
      "absolute lg:bottom-60 lg:left-32 bottom-14 left-24 text-green-400 opacity-70",
    animation: { scale: [2, 1.5, 2] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    icon: <Zap size={18} className="w-3 lg:w-16" />,
  },
];

const EBTExplanation: React.FC = () => {
  return (
    <div
      id="ebt-explanation"
      className="w-full bg-gradient-to-t from-green-50 via-white to-white relative overflow-hidden"
    >
      {decorativeElements.map((element, index) => (
        <motion.div
          key={index}
          className={element.className}
          animate={element.animation}
          transition={element.transition}
        >
          {element.icon}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Text Section */}
        <motion.div
          className="w-full lg:w-3/4 mb-8 lg:mb-0 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold text-left sm:text-5xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="block text-green-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Apa itu
            </motion.span>
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Energi Baru Terbarukan?
            </motion.span>
          </motion.h1>
          <motion.p
            className="mb-3 text-[17px] text-slate-500 lg:text-xl text-justify lg:text-left tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Energi Baru dan Terbarukan atau yang disingkat EBT adalah sumber
            energi yang berasal dari proses alam yang berkelanjutan dan dapat
            diperbaharui secara alami sehingga menjadi masa depan energi yang
            lebih bersih dan berkelanjutan. Dengan memanfaatkan kekayaan alam
            yang ada, kita bisa memenuhi kebutuhan energi tanpa merusak
            lingkungan.
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square -mt-20 lg:mt-0">
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/img/renewable-energy.webp"
                alt="Renewable Energy Mascot"
                className="w-full h-full object-contain sm scale-110"
              />
            </motion.div>

            {/* Decorative circles */}
            {["bg-yellow-200", "bg-green-200"].map((color, idx) => (
              <motion.div
                key={idx}
                className={`absolute w-20 h-20 sm:w-24 sm:h-24 ${color} rounded-full mix-blend-multiply filter blur-xl opacity-70`}
                style={{
                  top: idx === 0 ? "-5%" : "auto",
                  bottom: idx === 1 ? "-5%" : "auto",
                  left: idx === 0 ? "-5%" : "auto",
                  right: idx === 1 ? "-5%" : "auto",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.5, 0.7] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default EBTExplanation;
