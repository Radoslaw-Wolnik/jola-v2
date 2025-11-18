import { } from 'react';
import logo from "../assets/logo_white_simplified.png";
import { PiInstagramLogo } from "react-icons/pi";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-md p-2 bg-blue">

      <div className='flex flex-row justify-between gap-5 place-items-center'>
        <a href='#home' className='hover:text-gray-500 text-whitish'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col text-2xs place-items-center px-4'>
              <img src={logo} className='h-11'/>
              {/*<p className='text-whitish font-bold'>PSYCHOLOGIA</p> */}
            </div>
            <div className='hidden min-[1152px]:flex lg:flex-row md:gap-2 place-items-center font-bold '>
              <p className='text-white/90 text-xl font-medium'>Jolanta</p>
              <p className='text-white/90 text-xl font-medium'>Dominiak-Konderak</p>  {/* mby 2xl here */}
            </div>
          </div>
        </a>
        
        <div className='font-bold'><a href='https://twojpsycholog.pl/profil-psychologa/jolanta-dominiak-konderak-5957' className='mx-6 text-whitish text-xl font-semibold shadow-md text-shadow-md rounded-md bg-black/20 hover:bg-black/60 w-auto p-2 capitalize'>UMÓW WIZYTĘ</a></div>
        
        <div className='p-2'>
          <nav className='hidden min-[830px]:flex md:flex-row items-center gap-8 text-white/90 text-xl text-nowrap'>
            <a href='#about' className='hover:text-gray-500 text-whitish capitalize'>O MNIE</a>
            <a href='#offer' className='hover:text-gray-500 text-whitish capitalize'>OFERTA</a>
            <a href='#workspace' className='hover:text-gray-500 text-whitish capitalize'>PRAKTYKA</a>
            <a href='#office' className='hover:text-gray-500 text-whitish capitalize'>GABINET</a>
            <a href='https://instagram.com/jolanta_psychology' className='hover:text-gray-500 text-whitish capitalize'><PiInstagramLogo size={28} /></a> {/* change here to be dynamic mby */}
          </nav>

          <nav className=' bg-yellow-200 min-[830px]:hidden '>
            <button>🍔</button>
          </nav> 
        </div>
        

      </div>
    </header>
  )
};

export default Header;