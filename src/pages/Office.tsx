import { } from 'react';
import gabinet_1 from '../assets/gabinet/gabinet (1).png';
import gabinet_2 from '../assets/gabinet/gabinet (2).png';
import gabinet_3 from '../assets/gabinet/gabinet (3).png';
import gabinet_4 from '../assets/gabinet/gabinet (4).png';
import gabinet_5 from '../assets/gabinet/gabinet (5).png';
import gabinet_6 from '../assets/gabinet/gabinet (6).png';



import Carousel from '../components/Photos Carousel';


const officePhotos = [
  { src: gabinet_1, alt: 'Gabinet — lewy kadr' },
  { src: gabinet_2, alt: 'Gabinet — prawy kadr' },
  { src: gabinet_3, alt: 'Gabinet — detal' },
  { src: gabinet_4, alt: 'Gabinet — kadr 2' },
  { src: gabinet_5, alt: 'Gabinet — kadr 3' },
  { src: gabinet_6, alt: 'Gabinet — kadr 4' },
];


const Office = () => {
  return (
    <section id='office' className="lg:snap-start flex flex-col items-center min-h-[calc(100vh-60px)] p-16 gap-8">
      <div className='flex flex-col max-w-6xl items-center gap-8'>
        <div className='max-w-4xl'>
          <h1 className='text-blue text-3xl text-center'>Przestrzeń gabinetu</h1>
          <p className='text-center'>Zapraszam do przestrzeni, w której możesz bezpiecznie doświadczać siebie- w spotkaniu w tym, co trudne i w tym co wspierające. Moją rolą jest towarzyszenie w tej podróży powrotu do siebie. </p>
        </div>
        
        {/* here put the carousel 
        <div className='grid grid-cols-2 gap-12 max-w-3xl justify-evenly'>
          <img
              src={gabinet_1}
              alt="Portret Jolii w fotelu trzymającej kawę"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          <img
              src={gabinet_2}
              alt="Portret Jolii w fotelu trzymającej kawę"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
        </div>
        */}
        <Carousel photos={officePhotos} autoAdvanceDelay={8000} />
      </div>
    </section>
  )
};

export default Office;