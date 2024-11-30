import React, { useEffect, useState } from "react";

export function Gallery() {
    const data = [
        {
            imgelink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            imgelink:
                "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1; 
    const slides = [];
    for (let i = 0; i < data.length; i += itemsPerSlide) {
        slides.push(data.slice(i, i + itemsPerSlide));
    }

    // Fungsi untuk navigasi manual
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Auto-scroll dengan interval
    useEffect(() => {
        const intervalId = setInterval(goToNext, 3000); // 3 detik per slide

        return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
    }, []);

    return (
        <div className="relative w-full max-w-8xl mx-auto p-4 lg:px-20">
            {/* Container untuk slide */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
                {/* Wrapper untuk efek geser */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
                        width: `${slides.length * 100}%`,
                    }}
                >
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className="flex"
                            style={{
                                width: `${100 / slides.length}%`,
                            }}
                        >
                            {slide.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 p-2"
                                    style={{
                                        flex: `0 0 calc(100% / ${itemsPerSlide})`,
                                    }}
                                >
                                    <img
                                        src={item.imgelink}
                                        alt={`Gallery Image ${slideIndex}-${index}`}
                                        className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Tombol Navigasi */}
                <button
                    onClick={goToPrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow-lg focus:outline-none"
                >
                    &#8592;
                </button>
                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow-lg focus:outline-none"
                >
                    &#8594;
                </button>
            </div>

            {/* Indikator */}
            <div className="flex justify-center mt-4">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
}
