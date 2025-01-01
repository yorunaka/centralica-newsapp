import { useState, useEffect } from 'react'
import axios from "axios"
import Navbar from "./components/Navbar/Navbar"
import Index from "./Router/Index"
import { useDispatch } from 'react-redux'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleNewsQuery = async (query) => {
    // console.log(query)
    if (query != null){
      setSearchValue(query)
      getNewsData(query)
    }
  }

  const getNewsData = async (newsCategory = 'indonesia') => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_API_BASEURL}/api/news`, {
        params: {category: newsCategory}
      })
      // throw new Error('Simulated API Failure')
      const result = response.data.articles
      dispatch({ type: 'NEWS_DATA', news: result })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNewsData(searchValue)
  },[])

  return (
    <section className="bg-orange-100 min-h-screen top-0" data-theme='light'>
      <Navbar newsValue={handleNewsQuery}/>
      <Index getNewsData={getNewsData} searchValue={searchValue}/>
    </section>
  )
}

export default App
