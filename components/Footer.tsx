'use client'

import React from "react";
import { motion } from "framer-motion";
import { Facebook, Sun, Wind, Droplet, Mail, MapPin, Phone, YoutubeIcon } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden mt-10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-yellow-400" />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {/* Logo Section */}
                    <div className="text-center">
                        {/* <motion.img
                            src="/img/randuboto.png"
                            className="mx-auto h-12 sm:h-16"
                            alt="logo"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        /> */}
                        <h3 className="text-white font-bold text-xl mb-6">Brangwetan Island</h3>
                        <p className="mt-4 text-sm text-white font-medium">
                            Tujuan kami membuat platform ini adalah memberikan pengenalan akan Energi Baru Terbarukan (EBT) kepada masyarakat Desa Randuboto
                        </p>
                        <motion.div
                            className="mt-4 flex justify-center space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Sun className="text-yellow-300" size={24} />
                            <Wind className="text-blue-300" size={24} />
                            <Droplet className="text-blue-400" size={24} />
                        </motion.div>
                    </div>

                    {/* Follow Us Section */}
                    <div className="text-center">
                        <h3 className="text-white font-bold text-xl mb-6">Ikuti kami</h3>
                        <div className="flex justify-center space-x-8 text-white">
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                className="hover:text-yellow-300 transition-colors"
                                href="https://facebook.com/desa.randuboto"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook size={32} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                className="hover:text-yellow-300 transition-colors"
                                href="https://www.youtube.com/channel/UCYJ70_KQfVvVbx1PH-ZP4Ww"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="sr-only">Instagram</span>
                                <YoutubeIcon size={32} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Footer Contact Information Section */}
                    <div className="text-center">
                        <h3 className="text-white font-bold text-xl mb-6">Kontak Kami</h3>
                        <ul className="space-y-4 text-white">
                            <motion.li
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center"
                            >
                                <Mail size={16} className="mr-2" />
                                <span>desaranduboto@gmail.com</span>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center"
                            >
                                <MapPin size={16} className="mr-2" />
                                <span>Ds.Randuboto, Kec.Sidayu, Kab.Gresik</span>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center"
                            >
                                <Phone size={16} className="mr-2" />
                                <span>082122295005</span>
                            </motion.li>
                        </ul>
                    </div>


                </div>

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 border-t border-white border-opacity-30 pt-8 text-center text-sm text-white"
                >
                    <p>&copy; {currentYear} Brangwetan Island. Semua hak dilindungi.</p>
                </motion.div>
            </motion.div>

            {/* Decorative Wave */}
            <motion.svg
                className="absolute bottom-0 left-0 right-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.path
                    fill="#ffffff"
                    fillOpacity="0.2"
                    d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    animate={{
                        d: [
                            "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                            "M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,128C672,107,768,85,864,96C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 10,
                        ease: "easeInOut",
                    }}
                />
            </motion.svg>
        </footer>
    );
};

export default Footer;

