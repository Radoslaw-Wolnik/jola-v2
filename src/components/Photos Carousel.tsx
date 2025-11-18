import { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface Photo {
  src: string;
  alt: string;
}

interface CarouselProps {
  photos: Photo[];
  autoAdvanceDelay?: number;
  itemsToShow?: number; // New prop to control how many items to show
}

const Carousel = ({ photos, autoAdvanceDelay = 8000, itemsToShow = 1 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle next slide with smooth transition
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - itemsToShow ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide with smooth transition
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - itemsToShow : prevIndex - 1
    );
  };

  // Reset transitioning state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Matches the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-advance carousel (only when not transitioning)
  useEffect(() => {
    if (!isTransitioning) {
      const interval = setInterval(nextSlide, autoAdvanceDelay);
      return () => clearInterval(interval);
    }
  }, [autoAdvanceDelay, isTransitioning]);

  // Get current photos to display (dynamic number based on itemsToShow)
  const getCurrentPhotos = () => {
    const currentPhotos = [];
    for (let i = 0; i < itemsToShow; i++) {
      const photoIndex = (currentIndex + i) % photos.length;
      currentPhotos.push(photos[photoIndex]);
    }
    return currentPhotos;
  };

  const currentPhotos = getCurrentPhotos();

  // Dynamic grid classes based on itemsToShow
  const getGridClass = () => {
    switch (itemsToShow) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Carousel container with dynamic grid */}
      <div 
        className={`
          grid ${getGridClass()} gap-12 w-full
          transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isTransitioning ? 'opacity-90 scale-99' : 'opacity-100 scale-100'}
        `}
      >
        {currentPhotos.map((photo, index) => (
          <div
            key={`${currentIndex}-${index}`}
            className={`
              transition-all duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)]
              ${isTransitioning ? 'transform translate-x-2 opacity-90' : 'transform translate-x-0 opacity-100'}
            `}
            style={{
              transitionDelay: `${index * 100}ms` // Dynamic delay based on index
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out hover:scale-102"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows with enhanced transitions */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`
          absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 
          bg-white/90 hover:bg-white p-3 rounded-full shadow-xl
          transition-all duration-400 ease-out
          hover:scale-115 active:scale-105
          ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
          group
        `}
        aria-label="Previous photos"
      >
        <IoIosArrowBack className="text-blue text-2xl transition-transform duration-300 ease-out group-hover:-translate-x-1" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`
          absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 
          bg-white/90 hover:bg-white p-3 rounded-full shadow-xl
          transition-all duration-400 ease-out
          hover:scale-115 active:scale-105
          ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
          group
        `}
        aria-label="Next photos"
      >
        <IoIosArrowForward className="text-blue text-2xl transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </button>

      {/* Optional: Loading spinner during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-blue/30 border-t-blue rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Carousel;