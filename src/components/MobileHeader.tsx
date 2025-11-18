import { useState, useEffect, useRef } from 'react';
import { PiInstagramLogo } from "react-icons/pi";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
  if (e.target === e.currentTarget) {
    setIsOpen(false);
  }
};

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'O MNIE', href: '#about' },
    { name: 'OFERTA', href: '#offer' },
    { name: 'PRAKTYKA', href: '#workspace' },
    { name: 'GABINET', href: '#office' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="min-[830px]:hidden flex items-start">
        
        {/* Instagram Icon in Mobile Header */}
        <a 
          href="https://instagram.com/jolanta_psychology" 
          className="hover:text-gray-500 text-whitish ml-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiInstagramLogo size={24} />
        </a>

        {/* Hamburger Menu Button */}
        {!isOpen &&
        <button 
          ref={buttonRef}
          className="text-whitish rounded-md hover:bg-black/20 transition-colors mx-2 z-60 relative"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        }
        
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="min-[830px]:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown - Fixed Full Screen */}
      <div
        ref={menuRef}
        onClick={handleBackgroundClick}
        className={`
          min-[830px]:hidden fixed top-0 left-0 right-0 bottom-0 bg-blue z-50 
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <nav className="w-full max-w-sm mx-auto px-4">
          <ul className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href} className="w-full text-center">
                <a
                  href={item.href}
                  className="block text-whitish hover:text-gray-300 transition-colors font-semibold capitalize text-xl"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </a>
              </li>
            ))}
            
            {/* Book Appointment Button in Mobile Menu */}
            <li className="w-full text-center pt-4 mt-4 border-t border-white/20">
              <a 
                href="https://twojpsycholog.pl/profil-psychologa/jolanta-dominiak-konderak-5957"
                className="inline-block text-whitish text-lg font-semibold shadow-md rounded-md bg-black/40 hover:bg-black/60 px-6 py-3 capitalize transition-colors"
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                UMÓW WIZYTĘ
              </a>
            </li>
          </ul>
        </nav>

        {/* Close Button inside Menu */}
        <button 
          className="absolute top-4 right-4 text-whitish p-2 hover:bg-black/20 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MobileHeader;