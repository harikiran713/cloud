import React, { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    "https://img.theloom.in/pwa/loom/banners/24march-2025-The-Guest-List-Edit-Desktop-2nd-Banner.jpg?tr=h-624%2Cw-1600",
    "https://img.theloom.in/pwa/loom/banners/24march-2025-Holiday-Picks-Desktop-2nd-Banner.jpg?tr=h-624%2Cw-1600"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const goToNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-xl font-bold px-3 py-1 rounded-full shadow-md"
      >
        &#8249;
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-xl font-bold px-3 py-1 rounded-full shadow-md"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Hero;
