import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '/src/assets/logo.png'

const Navbar = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleInputChange = (value) => {
    setSearchValue(value)
  }
  
  const handleSearch = (e) => {
    e?.preventDefault()
    if(searchValue.trim() != ''){
      navigate(`/search/${searchValue}`)
    }
    props.newsValue(searchValue)
    setSearchValue('')
    // console.log(searchValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e?.preventDefault()

      const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
      if (!isMobile) {
        handleSearch(e)
      }
    }
  }

  const handleButton = (e) =>{
    if(!isOpen){
      setIsOpen(true)
    } else {
      handleSearch(e)
    }
     
  }

  if(location.pathname === '/error'){
    return null
  }

  return (
    <div>      
      {/* Navbar */}
      <section className="w-full h-52 bg-red-100 drop-shadow-lg p-4 ">
        <div className='grid grid-flow-col grid-cols-3 md:flex-row md:justify-between md:items-center lg:flex-row lg:justify-items-center lg:items-center'>
          <div className="h-auto md:mt-0">
              <a href="">
                <img src={logo} alt="logo" className="h-32 w-32 sm:h-32 sm:w-32 md:h-40 md:w-40" />
              </a>
          </div>

          <div className='flex sm:justify-items-center sm:items-center md:flex-col md:gap-0 lg:justify-items-center lg:w-full'>
            <div className="mt-4 hidden md:mt-0 md:hidden lg:block">
              <a href="" className='text-center'>
                <h1 className="text-2xl sm:text-3xl font-semibold">Centralica News</h1>
                <p className="text-sm sm:text-base">Berita Terbaru Dimanapun, dan Kapanpun.</p>
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center w-1/2 lg:justify-center lg:content-center">
          { isOpen && (
              <input 
                type="text" 
                placeholder="Search..."
                className={`transition-all duration-300 delay-300 ease-in-out overflow-hidden border border-gray-300 focus:outline-none focus:border-yellow-900 ${
                  isOpen 
                    ? 'w-full md:w-64 px-4 py-2 opacity-100 rounded-l-md pointer-events-auto' 
                    : 'w-0 px-0 py-2 opacity-0 border-transparent pointer-events-none'
                }`}
                value={searchValue}
                onChange={(e) => {
                  handleInputChange(e.target.value)
                }}
                onKeyDown={handleKeyDown}
              />
            )}
            <button
              type='button'
              aria-label='search'
              onClick={handleButton}
              className={`bg-yellow-950/40 px-4 py-2.5 rounded-md hover:bg-yellow-950/50 cursor-pointer transition-colors flex justify-center items-center ${isOpen ? 'rounded-l-none' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                  <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
            </button>
          </div>    
        </div>
      </section>
      
      <div>
        <ul className="flex flex-wrap justify-center gap-1 md:gap-4 mt-6">
          <NavLink
            exact="true"
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800 text-sm sm:text-base"
            to="/"
          >
            Home
          </NavLink>          
          <NavLink
            exact="true"
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800 text-sm sm:text-base"
            to="/"
          >
            Indonesia
          </NavLink>
          <NavLink
            exact="true"
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800 text-sm sm:text-base"
            to="/programming"
          >
            Programming
          </NavLink>
          <NavLink
            exact="true"
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800 text-sm sm:text-base"
            to="/covid"
          >
            COVID-19
          </NavLink>
          <NavLink
            exact="true"
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800 text-sm sm:text-base"
            to="/saved"
          >
            Saved
          </NavLink>
        </ul>
        <div className='grid justify-items-center'>
          <hr className="w-[1500px]" />
        </div>
      </div>
    </div>
  )
  
}

export default Navbar