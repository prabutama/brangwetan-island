import { Button } from "@/components/ui/button"; // Pastikan menggunakan komponen dari ShadCN
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="bg-white text-black pt-20">
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
                                <div className="hidden sm:mb-8 sm:flex">
                                    <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                        Menuju lingkungan hidup bersih.{' '}
                                        <a href="#" className="font-semibold text-indigo-600">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Read more <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                                    Renewable Energy Education Center
                                </h1>
                                <p className="mt-6 text-sm md:text-base lg:text-lg text-gray-700 text-justify">
                                    Brangwetan Island merupakan langkah awal dalam mewujudkan lingkungan hidup yang lebih bersih dan sehat. Kami menyediakan berbagai pembelajaran mengenai Energi Baru Terbarukan yang dikemas dengan sangat menarik dan memberikan pengalaman belajar yang mengesankan.
                                </p>
                                <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
                                    <Button
                                        variant="outline"
                                        className="px-4 py-2 text-sm font-semibold text-black border border-gray-500 hover:bg-black hover:text-white"
                                    >
                                        Get started
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

                {/* Background Gradient - Bottom */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-black to-white opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    );
}
