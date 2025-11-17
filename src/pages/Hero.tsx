import { } from 'react';
import forest from '../assets/forest2.png';

const Hero = () => {
  return (
    <section id="home" className="lg:snap-start bg-center bg-cover bg-no-repeat flex flex-col items-center min-h-[calc(100vh-60px)]" style={{ backgroundImage: `url(${forest})` }}> {/* bg-linear-to-b from-[rgba(59,47,47,0.0)] from-70% to-[rgba(63,42,42,0.8)] to-100% */}
      <div className='mt-8 flex-1 flex items-center px-40'>
        <div className='flex flex-col items-center'>
          <h1 className='font-montserrat text-whitish font-bold text-3xl tracking-[.5em] uppercase text-shadow-md'>GABINET PSYCHOLOGICZNY</h1> 
          <h1 className='font-montserrat text-whitish font-bold text-3xl tracking-[.25em] uppercase text-shadow-md '>W GLIWICACH I ONLINE</h1>
        </div>
        
      </div>
      <div className='mb-4 flex flex-col items-center'>
        <p className='text-whitish'>“To co leczy, to relacja - nie interpretacja”</p>
        <p className='text-whitish capitalize'>Isadore From</p>
      </div>
    </section>
  )
};

export default Hero;