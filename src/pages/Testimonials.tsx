import { BiSolidQuoteAltLeft } from "react-icons/bi";
import TestimonialsCarousel from '../components/Testimonials Carousel';

const Testimonials = () => {
  return (
    <section className="lg:snap-start flex flex-col justify-center items-center bg-dark-blue min-h-[calc(100vh-60px)] w-full md:p-16 gap-8" aria-label="Opinie i referencje">
      <div className='flex flex-col w-full shrink-0 items-center gap-6 min-[320px]:mx-10'>
        <h1 className='text-whitish text-3xl uppercase'>OPINIE</h1>
        <div className="w-80 h-0.5 bg-yellow/70 rounded" aria-hidden />
        <BiSolidQuoteAltLeft size={25} color='#d8ae5e'/>
        <div className='w-full shrink-0 gap-8 justify-center items-center'>
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  )
};

export default Testimonials;
