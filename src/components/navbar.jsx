import React, { useState } from 'react';
import assets from '../data'; 

const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const languages = ['English', 'हिन्दी'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  return (
    <nav className="w-full h-[68px] bg-transparent flex items-center justify-between px-8 pt-8 z-50 absolute">
      <div className='z-10'>
        <a href="/">
          <img src={assets.logo} alt="logo" className="h-10" />
        </a>
      </div>

      <div className="flex items-center gap-4 relative">
        
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-black border border-white text-white px-8 py-2 rounded-2xl cursor-pointer"
          >
            {selectedLanguage}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-300 rounded-lg shadow-lg z-20">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-5 py-2 hover:bg-gray-400 rounded-lg cursor-pointer ${
                    selectedLanguage === lang ? 'font-semibold bg-gray-400' : ''
                  }`}
                >
                  {selectedLanguage === lang && <span className="mr-2">✓</span>}
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sign In Button */}
        <button className="bg-[#E50914] px-5 py-2 text-white rounded-lg hover:bg-red-700 transition cursor-pointer">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
