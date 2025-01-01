import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '/src/assets/logo.png'

const Navbar = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleInputChange = (value) => {
    setSearchValue(value)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    if(searchValue.trim() != ''){
      navigate(`/search/${searchValue}`)
    }
    props.newsValue(searchValue)
    setSearchValue('')
  }

  if(location.pathname === '/error'){
    return null
  }

  return (
    <div>      
    {/* navbar */}
    <section className="min-w-full h-52 bg-red-100 grid grid-flow-row grid-cols-3 place-items-center items-center drop-shadow-lg ">
      <div className='flex flex-row items-center'>
        <input 
        type="text" 
        name="searchbox" 
        id="searchinputform" 
        placeholder="Search..." 
        className="px-8 py-2" 
        value={searchValue}
        onChange={(e) => {
          handleInputChange(e.target.value)
        }}
        />
        <a href=""
        type='submit'
        onClick={handleSearch}>          
          <div className='bg-yellow-950/40 px-2 py-1 rounded-r-md hover:bg-yellow-950/50'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50" >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </div>
        </a>
      </div>
      <div>
        <a href="">
          <h1 className="text-3xl font-semibold text-center">Centralica News</h1>
          <p>Berita Terbaru Dimanapun, dan Kapanpun.</p>
        </a>
      </div>
      <div>
        <a href="">
          <img src={logo} alt="logo" className='h-40 w-40'/>
        </a>
      </div>
    </section>
    <div>
        <ul className="flex flex-row justify-center gap-10 mt-14">
            <NavLink
            exact='true'
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800"
            to="/"
            >
            Indonesia
            </NavLink>
            <NavLink
            exact='true'
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800"
            to="/programming"
            >
            Programming
            </NavLink>
            <NavLink
            exact='true'
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800"
            to="/covid"
            >
            COVID-19
            </NavLink>
            <NavLink
            exact='true'
            className="navbar__link px-3 py-2 hover:bg-black/10 focus:border-b-2 focus:border-b-yellow-800"
            to="/saved"
            >
            Saved
            </NavLink>
        </ul>
        <hr />
      </div>
    </div>
  )
}

export default Navbar