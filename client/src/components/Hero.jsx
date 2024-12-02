import { Button } from "@/components/ui/button"; // Pastikan menggunakan komponen dari ShadCN
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <>
            <svg
                id="wave"
                style={{ transform: "rotate(180deg)", transition: "0.3s" }}
                viewBox="0 0 1440 180"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gradient-colors" x1="0" x2="1" y1="0" y2="0">
                        <stop stopColor="#41b05c" offset="0%" /> {/* hijau */}
                    </linearGradient>
                </defs>
                <path
                    style={{
                        transform: "translate(0, 0px)",
                        opacity: 1,
                    }}
                    fill="url(#gradient-colors)"
                    d="M0,0L40,20C80,40,160,80,240,100C320,120,400,120,480,104C560,88,640,56,720,40C800,24,880,24,960,44C1040,64,1120,104,1200,108C1280,112,1360,80,1440,84C1520,88,1600,128,1680,140C1760,152,1840,136,1920,136C2000,136,2080,152,2160,156C2240,160,2320,152,2400,156C2480,160,2560,176,2640,156C2720,136,2800,80,2880,52C2960,24,3040,24,3120,28C3200,32,3280,40,3360,60C3440,80,3520,112,3600,140C3680,168,3760,192,3840,192C3920,192,4000,168,4080,168C4160,168,4240,192,4320,184C4400,176,4480,136,4560,108C4640,80,4720,64,4800,76C4880,88,4960,128,5040,140C5120,152,5200,136,5280,128C5360,120,5440,120,5520,120C5600,120,5680,120,5720,120L5760,120L5760,240L5720,240C5680,240,5600,240,5520,240C5440,240,5360,240,5280,240C5200,240,5120,240,5040,240C4960,240,4880,240,4800,240C4720,240,4640,240,4560,240C4480,240,4400,240,4320,240C4240,240,4160,240,4080,240C4000,240,3920,240,3840,240C3760,240,3680,240,3600,240C3520,240,3440,240,3360,240C3280,240,3200,240,3120,240C3040,240,2960,240,2880,240C2800,240,2720,240,2640,240C2560,240,2480,240,2400,240C2320,240,2240,240,2160,240C2080,240,2000,240,1920,240C1840,240,1760,240,1680,240C1600,240,1520,240,1440,240C1360,240,1280,240,1200,240C1120,240,1040,240,960,240C880,240,800,240,720,240C640,240,560,240,480,240C400,240,320,240,240,240C160,240,80,240,40,240L0,240Z"
                ></path>
            </svg>
            <div className="bg-white text-black -mt-24">
                <div className="relative isolate px-6 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative"
                        />
                    </div>

                    <div className="mx-auto max-w-7xl py-10 sm:py-24 lg:py-5 px-4 sm:px-8 md:px-12">
                        <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
                                {/* Left Column */}
                                <div className="w-full md:w-1/2">
                                    <div className="hidden sm:mb-3 sm:flex">
                                        <div className="relative rounded-full px-3 text-sm text-hijau ring-1 ring-hijau py-1">
                                            Menuju lingkungan hidup bersih.{' '}
                                        </div>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hijau font-poppins ">
                                        Renewable Energy Education Center
                                    </h1>
                                    <p className="mt-3 text-sm md:text-base lg:text-lg text-gray-700">
                                        Brangwetan Island merupakan langkah awal dalam mewujudkan lingkungan hidup yang lebih bersih dan sehat. Kami menyediakan berbagai pembelajaran mengenai Energi Baru Terbarukan yang dikemas dengan sangat menarik dan memberikan pengalaman belajar yang mengesankan.
                                    </p>
                                    <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
                                        <Button
                                            variant="outline"
                                            className="px-4 py-2 text-sm font-semibold bg-hijau text-white hover:bg-green-600 hover:text-white"
                                        >
                                            Mulai Belajar
                                            <span className="ms-2 font-semibold" aria-hidden="true">&rarr;</span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="w-full md:w-1/2 flex items-center justify-center">
                                    <img src="/img/hero.png" className="w-full rounded-md flex items-center justify-center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
