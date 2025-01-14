"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const scrollToElement = (
  id: string,
  offsetMobile: number = -60,
  offsetDesktop: number = -100
): void => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const offset = window.innerWidth < 768 ? offsetMobile : offsetDesktop;
    window.scrollTo({
      top: rect.top + window.scrollY + offset,
      behavior: "smooth",
    });
  }
};

const HeroAnimation = {
  fadeIn: (delay: number = 0.2, duration: number = 0.8) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration },
  }),
  scaleBounce: {
    animate: { scale: [1, 1.1, 1], rotate: [0, 10, 0] },
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
  },
  float: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  },
};

const GradientPath: React.FC = () => (
  <svg
    className="absolute bottom-0 left-0 right-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <motion.path
      fill="#4ade80"
      d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    ></motion.path>
  </svg>
);

interface BlurCircleProps {
  className: string;
  delay: number;
}

const BlurCircle: React.FC<BlurCircleProps> = ({ className, delay }) => (
  <motion.div
    className={className}
    {...HeroAnimation.scaleBounce}
    transition={{ ...HeroAnimation.scaleBounce.transition, delay }}
  ></motion.div>
);

const Hero: React.FC = () => {
  const [bounceCount, setBounceCount] = useState(0);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen flex items-center pt-32 sm:pt-0 lg:pt-0">
      <div className="absolute inset-0">
        <GradientPath />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 -mt-32 sm:-mt-40">
          <motion.div
            className="flex-1 lg:text-left"
            {...HeroAnimation.fadeIn(0.2)}
          >
            <motion.div
              className="inline-flex items-center rounded-xl lg:rounded-full bg-green-100 px-3 py-1 text-[14px] lg:text-[16px] font-semibold lg:font-semibold text-green-800 mb-2 sm:mb-5 mt-[8%]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              <motion.span
                className="mr-2 h-2 w-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Mari Belajar Energi Terbarukan!
              </motion.span>
            </motion.div>
            <motion.h1 className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold text-left sm:text-5xl lg:text-6xl">
              <motion.span
                className="block text-green-600"
                {...HeroAnimation.fadeIn(0.4)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Reneawble Energy
              </motion.span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
                {...HeroAnimation.fadeIn(0.6)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Education Center
              </motion.span>
            </motion.h1>
            <motion.p
              className="mb-3 text-[17px] text-slate-500 lg:text-xl text-justify lg:text-left tracking-tight"
              {...HeroAnimation.fadeIn(0.8)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Brangwetan Island merupakan langkah awal dalam mewujudkan
              lingkungan hidup yang lebih bersih dan sehat. Kami menyediakan
              berbagai pembelajaran mengenai Energi Baru Terbarukan yang dikemas
              dengan sangat menarik dan memberikan pengalaman belajar yang
              mengesankan.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start lg:justify-start"
              {...HeroAnimation.fadeIn(1)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToElement("ebt-explanation")}
                  className="w-fit bg-primary text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-center"
                >
                  <motion.span
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      repeatType: "reverse",
                    }}
                  >
                    Mulai Petualangan
                  </motion.span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      repeatType: "loop",
                    }}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 lg:flex lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative">
                <BlurCircle
                  className="absolute -top-4 right-6 lg:-right-4 lg:h-72 lg:w-72 h-28 w-28 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                  delay={0}
                />
                <BlurCircle
                  className="absolute bottom-6 lg:-bottom-8 left-4 lg:-left-4 lg:h-72 lg:w-72 h-28 w-28 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                  delay={1}
                />
                <BlurCircle
                  className="absolute -bottom-4 right-2 lg:-right-12 lg:h-72 lg:w-72 h-28 w-28 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                  delay={2}
                />
                <motion.img
                  className="relative rounded-lg lg:scale-125 lg:mt-44 sm:scale-[140%] sm:mt-20"
                  src="/img/renewable-energy.webp"
                  alt="Renewable Energy Education"
                  {...HeroAnimation.fadeIn(1)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  onDragEnd={() => setBounceCount((prev) => prev + 1)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20"
        {...HeroAnimation.float}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-green-300 rounded-full opacity-20"
        {...HeroAnimation.float}
        transition={{ ...HeroAnimation.float.transition, delay: 0.5 }}
      />
    </div>
  );
};

export default Hero;
