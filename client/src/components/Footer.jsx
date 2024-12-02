import React from "react";

const Footer = () => {
    return (
        <>
              <svg
                id="wave"
                style={{ transform: 'rotate(0deg)', transition: '0.3s' }}
                viewBox="0 0 1440 150"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg:block"
            >
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop stopColor="#41b05c" offset="0%" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#sw-gradient-0)"
                    d="M0,153L80,133.2C160,113,320,74,480,73.7C640,74,800,113,960,110.5C1120,108,1280,62,1440,39.7C1600,17,1760,17,1920,17C2080,17,2240,17,2400,19.8C2560,23,2720,28,2880,25.5C3040,23,3200,11,3360,25.5C3520,40,3680,79,3840,82.2C4000,85,4160,51,4320,31.2C4480,11,4640,6,4800,5.7C4960,6,5120,11,5280,22.7C5440,34,5600,51,5760,70.8C5920,91,6080,113,6240,110.5C6400,108,6560,79,6720,76.5C6880,74,7040,96,7200,107.7C7360,119,7520,119,7680,110.5C7840,102,8000,85,8160,70.8C8320,57,8480,45,8640,48.2C8800,51,8960,68,9120,70.8C9280,74,9440,62,9600,59.5C9760,57,9920,62,10080,59.5C10240,57,10400,45,10560,53.8C10720,62,10880,91,11040,96.3C11200,102,11360,85,11440,76.5L11520,68L11520,170L11440,170C11360,170,11200,170,11040,170C10880,170,10720,170,10560,170C10400,170,10240,170,10080,170C9920,170,9760,170,9600,170C9440,170,9280,170,9120,170C8960,170,8800,170,8640,170C8480,170,8320,170,8160,170C8000,170,7840,170,7680,170C7520,170,7360,170,7200,170C7040,170,6880,170,6720,170C6560,170,6400,170,6240,170C6080,170,5920,170,5760,170C5600,170,5440,170,5280,170C5120,170,4960,170,4800,170C4640,170,4480,170,4320,170C4160,170,4000,170,3840,170C3680,170,3520,170,3360,170C3200,170,3040,170,2880,170C2720,170,2560,170,2400,170C2240,170,2080,170,1920,170C1760,170,1600,170,1440,170C1280,170,1120,170,960,170C800,170,640,170,480,170C320,170,160,170,80,170L0,170Z"
                />
            </svg>
            <footer className="bg-hijau text-white py-16">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {/* Logo Section */}
                        <div className="text-center">
                            <img
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="mx-auto h-10 sm:h-12"
                                alt="logo"
                            />
                            <p className="mt-4 text-sm text-white">
                                Tujuan kami membuat platform ini adalah memberikan pengenalan akan Energi Baru Terbarukan (EBT) kepada masyarakat Desa Randuboto
                            </p>
                        </div>

                        {/* Follow Us Section */}
                        <div className="text-center">
                            <h3 className="text-white font-semibold text-lg mb-4">Ikuti kami</h3>
                            <div className="flex justify-center space-x-8 text-white">
                                <a className="hover:text-indigo-500 transition-colors" href="#" target="_blank" rel="noreferrer">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a className="hover:text-pink-500 transition-colors" href="#" target="_blank" rel="noreferrer">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Footer Links Section */}
                        <div className="text-center">
                            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-white">
                                <li><a href="#" className="transition-colors">About Us</a></li>
                                <li><a href="#" className="transition-colors">Services</a></li>
                                <li><a href="#" className="transition-colors">Contact</a></li>
                                <li><a href="#" className="transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-12 border-t border-white pt-8 text-center text-sm text-white">
                        <p>&copy; {new Date().getFullYear()} Brangwetan Island. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
