"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Photo {
  id: number;
  image: string;
}

const photos: Photo[] = [
  {
    id: 1,
    image: "/img/doc1.jpeg",
  },
  {
    id: 2,
    image: "/img/doc3.jpeg",
  },
  {
    id: 3,
    image: "/img/doc2.jpeg",
  },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying]);

  // Calculate visible photos based on screen size
  const getVisibleMentors = () => {
    const allPhotos = [...photos];
    const result = [];
    for (let i = 0; i < photos.length; i++) {
      result.push(allPhotos[(currentIndex + i) % photos.length]);
    }
    return result;
  };

  return (
    <>
      <motion.h1
        className="mb-4 flex justify-center gap-4 lg:mb-6 text-3xl tracking-tight font-bold sm:text-5xl lg:text-5xl text-center"
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
          Dokumentasi
        </motion.span>
        <motion.span
          className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Kegiatan
        </motion.span>
      </motion.h1>

      <div className="w-full max-w-8xl mx-auto lg:px-20 px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="link"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-transparent backdrop-blur-sm shadow-md hover:bg-gray-100 md:flex"
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="link"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-transparent backdrop-blur-sm shadow-md hover:bg-gray-100 md:flex"
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div className="flex gap-4 transition-transform duration-500 ease-in-out">
              {getVisibleMentors().map((photo) => (
                <Card
                  key={photo.id}
                  className="flex-shrink-0 w-full bg-white sm:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(50%-12px)]"
                >
                  <CardContent className="p-2 flex flex-col items-center text-center space-y-4">
                    <div className="relative w-full xs:h-60 md:h-48 lg:h-96 object-contain">
                      <Image
                        src={photo.image}
                        alt={"Dokumentasi"}
                        fill
                        className="rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-4 gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-white"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
