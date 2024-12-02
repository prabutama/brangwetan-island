import React from 'react';

const Module = ({ src, poster }) => {
    return (
        <div className="video-container mx-auto my-4 max-w-full">
            <video
                className="rounded-lg shadow-md w-[90%] h-auto aspect-video mx-auto"
                poster={poster}
                controls
                autoPlay
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Module;
