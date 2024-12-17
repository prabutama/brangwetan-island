import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {

    const scrollToEbtExplanation = () => {
        const element = document.getElementById('ebt-explanation');
        if (element) {
            const rect = element.getBoundingClientRect();
            const isMobile = window.innerWidth < 768; 
            const offset = isMobile ? -60 : -100; 
            window.scrollTo({
                top: rect.top + window.scrollY + offset,
                behavior: 'smooth',
            });
        }
    };
    

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen flex items-center pt-20 sm:pt-0 lg:pt-0">
            <div className="absolute inset-0">
                <svg
                    className="absolute bottom-0 left-0 right-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        fill="#4ade80"
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></motion.path>
                </svg>
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 -mt-24 sm:-mt-40">
                    <motion.div
                        className="flex-1 lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-[12px] lg:text-[16px] font-normal lg:font-semibold text-green-800 mb-2 sm:mb-5 mt-10"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                        >
                            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                            Menuju lingkungan hidup bersih
                        </motion.div>
                        <motion.h1
                            className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold text-left sm:text-5xl lg:text-6xl"
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
                                Renewable Energy
                            </motion.span>
                            <motion.span
                                className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                Education Center
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            className="mb-3 text-[17px] text-slate-500 lg:text-xl text-justify lg:text-left tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            Brangwetan Island merupakan langkah awal dalam mewujudkan lingkungan hidup yang lebih bersih dan sehat. Kami menyediakan berbagai pembelajaran mengenai Energi Baru Terbarukan yang dikemas dengan sangat menarik dan memberikan pengalaman belajar yang mengesankan.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start z-10 absolute"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <Button
                                onClick={scrollToEbtExplanation}
                                className="bg-gradient-to-r from-green-600 to-yellow-400 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-center"
                            >
                                Mulai Belajar
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
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
                                <motion.div
                                    className="absolute -top-4 right-6 lg:-right-4 lg:h-72 lg:w-72 h-28 w-28 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                    }}
                                ></motion.div>
                                <motion.div
                                    className="absolute bottom-6 lg:-bottom-8 left-4 lg:-left-4 lg:h-72 lg:w-72 h-28 w-28 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        delay: 1,
                                    }}
                                ></motion.div>
                                <motion.div
                                    className="absolute -bottom-4 right-2 lg:-right-12 lg:h-72 lg:w-72 h-28 w-28 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        delay: 2,
                                    }}
                                ></motion.div>
                                <motion.div
                                    className="relative animate-float"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    <img
                                        className="relative rounded-lg lg:scale-125 lg:mt-44 sm:scale-125 sm:mt-20"
                                        src="/img/renewable-energy.png"
                                        alt="Renewable Energy Education"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div
                className="absolute bottom-0 left-0 right-0"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#4ade80" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </motion.div>
        </div>
    );
};

export default Hero;

