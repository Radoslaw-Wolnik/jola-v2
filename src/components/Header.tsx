import { } from 'react';
import logo from "../assets/logo.png";
import { PiInstagramLogo } from "react-icons/pi";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-md p-2 bg-blue">

      <div className='flex flex-row justify-between gap-5 place-items-center'>
        <a href='#home' className='hover:text-gray-500 text-whitish'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col text-2xs place-items-center'> {/* make new logo with white font - ugh */}
              <img src={logo} className='h-11'/>
              <p className='text-whitish font-bold'>PSYCHOLOGIA</p> 
            </div>
            <div className='hidden lg:flex lg:flex-row md:gap-2 place-items-center font-bold '>
              <p className='text-white/90 text-xl'>Jolanta</p>
              <p className='text-white/90 text-xl'>Dominiak-Konderak</p>  {/* mby 2xl here */}
            </div>
          </div>
        </a>
        
        <div className='font-bold'><a href='#contact' className='hover:text-gray-500 text-whitish text-xl capitalize'>UMÓW WIZYTĘ</a></div>
        
        <div className='p-2'>
          <nav className='hidden md:flex md:flex-row items-center gap-8 text-white/90 text-xl text-nowrap'>
            <a href='#about' className='hover:text-gray-500 text-whitish capitalize'>O MNIE</a>
            <a href='#offer' className='hover:text-gray-500 text-whitish capitalize'>OFERTA</a>
            <a href='#workspace' className='hover:text-gray-500 text-whitish capitalize'>PRAKTYKA</a>
            <a href='#office' className='hover:text-gray-500 text-whitish capitalize'>GABINET</a>
            <a href='https://instagram.com/jolanta_psychology' className='hover:text-gray-500 text-whitish capitalize'><PiInstagramLogo size={35} /></a> {/* change here to be dynamic mby */}
          </nav>

          <nav className=' bg-yellow-200 md:hidden '>
            <button>🍔</button>
          </nav> 
        </div>
        

      </div>
    </header>
  )
};

export default Header;