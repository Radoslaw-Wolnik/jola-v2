import { useEffect, useState } from 'react';
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
  const [itemsToShow, setItemsToShow] = useState(1);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint and above
        setItemsToShow(2);
      } else if (window.innerWidth >= 768) { // md breakpoint
        setItemsToShow(2); // or 1 if you prefer
      } else { // sm breakpoint and below
        setItemsToShow(1);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section id='office' className="lg:snap-start flex flex-col items-center min-h-[calc(100vh-60px)] p-16 gap-8">
      <div className='flex flex-col max-w-6xl items-center gap-8'>
        <div className='max-w-4xl'>
          <h1 className='text-blue text-3xl text-center'>Przestrzeń gabinetu</h1>
          <p className='text-center'>Zapraszam do przestrzeni, w której możesz bezpiecznie doświadczać siebie- w spotkaniu w tym, co trudne i w tym co wspierające. Moją rolą jest towarzyszenie w tej podróży powrotu do siebie. </p>
        </div>
        
        {/* 1 phioto on mobile and 2 photos on bigger
        */}
        <Carousel photos={officePhotos} autoAdvanceDelay={8000} itemsToShow={itemsToShow} />
      </div>
    </section>
  )
};

export default Office;