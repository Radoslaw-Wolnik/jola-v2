import { } from 'react';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import TestimonialsCarousel from '../components/Testimonials Carousel';

const Testimonials = () => {
  return (
    <section className="snap-start flex flex-col justify-center items-center bg-dark-blue h-[calc(100vh-72px)] p-16 gap-8" aria-label="Opinie i referencje">
      <div className='flex flex-col items-center gap-6 max-w-6xl'>
        <h1 className='text-whitish text-3xl uppercase'>OPINIE</h1>
        <div className="w-80 h-0.5 bg-yellow/70 rounded" aria-hidden />
        <BiSolidQuoteAltLeft size={25} color='#d8ae5e'/>
        <div className='flex flex-row gap-8 items-center'>
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  )
};

export default Testimonials;