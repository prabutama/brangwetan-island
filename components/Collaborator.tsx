"use client";

import { motion } from "framer-motion";

export default function Collaborator() {
  const collaborators = [
    {
      id: 1,
      title: "PENS",
      web_url: "http://pens.ac.id",
      img: "/img/pens.webp",
    },
    {
      id: 2,
      title: "Brangwetan Island",
      web_url: "https://desaranduboto.gresikkab.go.id/",
      img: "/img/randuboto.webp",
    },
    {
      id: 3,
      title: "E-BIO",
      web_url: "http://ebiopens.com",
      img: "/img/ebio.webp",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.h1
        className="mb-2 lg:mb-6 text-3xl text-center tracking-tight font-bold sm:text-5xl lg:text-6xl mt-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.span
          className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Kolaborator Kami
        </motion.span>
      </motion.h1>

      <motion.p
        className="mb-3 lg:mb-6 text-[17px] text-slate-500 lg:text-xl text-center tracking-tight w-full lg:w-[50%] mx-auto px-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Platform pembelajaran ini adalah hasil kolaborasi yang apik dari
        beberapa pihak yang berdedikasi dan berkomitmen untuk memberikan
        pengetahuan tentang Energi Baru Terbarukan
      </motion.p>

      <motion.div
        className="mt-2 grid grid-cols-3 gap-6 justify-center lg:border-2 lg:border-hijau rounded-full py-10 lg:w-[50%] mx-auto lg:shadow-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {collaborators.map((collaborator) => (
          <motion.div
            key={collaborator.id}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center mx-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={`${collaborator.web_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 flex justify-center items-center z-10"
            >
              <motion.img
                className="w-full h-full object-contain rounded-full transition-all duration-300 hover:grayscale-0"
                src={collaborator.img}
                alt={collaborator.title}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
