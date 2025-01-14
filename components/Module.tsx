"use client";
import { motion } from "framer-motion";
import React from "react";
import YouTubeEmbed from "./YoutubeEmbed";

export default function Module() {
  return (
    <>
      <div className="lg:container mx-auto px-4 lg:px-20 py-12">
        <motion.h1
          className="mb-2 flex justify-center gap-4 lg:mb-6 text-3xl tracking-tight font-bold sm:text-5xl lg:text-5xl text-center"
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
            Video
          </motion.span>
          <motion.span
            className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Pembelajaran
          </motion.span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <YouTubeEmbed
            videoId="dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up"
            description="The classic music video that became an internet phenomenon. Experience the unforgettable melody and dance moves that have captivated millions."
          />
          <YouTubeEmbed
            videoId="9bZkp7q19f0"
            title="PSY - GANGNAM STYLE"
            description="The record-breaking K-pop hit that took the world by storm. Witness the catchy tune and iconic dance that made this video a global sensation."
          />
        </div>
      </div>
    </>
  );
}
