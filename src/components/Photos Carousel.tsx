import { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface Photo {
  src: string;
  alt: string;
}

interface CarouselProps {
  photos: Photo[];
  autoAdvanceDelay?: number;
}

const Carousel = ({ photos, autoAdvanceDelay = 8000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, autoAdvanceDelay);
    return () => clearInterval(interval);
  }, [autoAdvanceDelay]);

  // Get current photos to display (2 at a time)
  const getCurrentPhotos = () => {
    const currentPhotos = [];
    for (let i = 0; i < 2; i++) {
      const photoIndex = (currentIndex + i) % photos.length;
      currentPhotos.push(photos[photoIndex]);
    }
    return currentPhotos;
  };

  const currentPhotos = getCurrentPhotos();

  return (
    <div className="relative w-full max-w-3xl">
      {/* Carousel container */}
      <div className="grid grid-cols-2 gap-12 w-full">
        {currentPhotos.map((photo, index) => (
          <img
            key={`${currentIndex}-${index}`}
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover object-center rounded-2xl"
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous photos"
      >
        <IoIosArrowBack className="text-blue text-2xl" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next photos"
      >
        <IoIosArrowForward className="text-blue text-2xl" />
      </button>
    </div>
  );
};

export default Carousel;