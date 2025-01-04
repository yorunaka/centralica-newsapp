import React, { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import usePagination from '../hooks/usePagination'

const Indonesia = (props) => {
  const news = useSelector((state) => state.newsData) || []
  const { handleDuplicate } = useLocalStorage('savedArticles', []);
  const { currentNewsPage, paginate, pageNumbers, currentPage } = usePagination(news || [])
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

  const cleanDescription = (description) => {
    return description ? description.replace(/\[\+\d+ chars\]/, '').trim() : 'No description available'
  }

  useEffect(() => {
    setLoading('false')
    const fetchData = () => {
      try {
        props.getNewsData()
      } catch (error) {
        console.error('Error fetching news:', error)
        navigate('/error', {state: {error: error.message || 'failed to fetch news'}})
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1500)
        }
      }
  
      fetchData()
  },[])

  return (
    <div>
      <div id='title' className='text-center text-2xl sm:text-3xl lg:text-4xl pt-6 font-bold'>
        Indonesia News
      </div>
      {loading ? (
        <div className='flex flex-col items-center'>
          <div className='pt-24 loading loading-ring loading-lg'></div>
          <div className='text-black text-lg sm:text-xl lg:text-2xl'>Fetching News...</div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 px-12 py-8 lg:px-36">
            {currentNewsPage.map((article, index) => (
              <div className="grid grid-flow-row gap-2 p-4 rounded-lg border border-gray-300 shadow-sm sm:hover:bg-orange-200/50 md:border-none md:shadow-none md:hover:bg-transparent" key={index}>
                <div className="text-xs sm:text-sm text-gray-500">
                  {article.source.name}
                </div>
                <div className="text-lg font-semibold" id="title">
                  {article.title}
                </div>
                <div className="text-sm sm:text-md text-gray-400" id="writer">
                  {article.author}
                </div>
                <div className="text-sm sm:text-md text-gray-600 line-clamp-3" id="desc">
                  {cleanDescription(article.content) ||
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto officiis voluptatibus distinctio dolorum. Fugiat, nemo cumque dolorem facere a consectetur. Eius quam unde similique velit praesentium alias deserunt a adipisci amet rerum!"}
                </div>
                <div className="flex flex-row justify-center md:justify-start lg:justify-start gap-2 sm:gap-4 mt-2">
                  <a
                    href=''
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(`${article.url}`, "_blank")
                    }}
                    rel="noopener noreferrer"
                    className="h-10 flex items-center justify-center px-4 bg-orange-400/70 rounded-lg hover:bg-orange-400/50 text-center text-sm sm:text-md"
                  >
                    Read More...
                  </a>
                  <button
                    className="h-10 flex items-center justify-center px-4 bg-blue-400/70 rounded-lg hover:bg-blue-400/50 text-sm sm:text-md"
                    onClick={(e) => {
                      e.preventDefault()
                      handleDuplicate(article)
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
          {pageNumbers.length > 0 && (
            <div className="flex justify-center mt-4 pb-8">
              {pageNumbers.map((number, index) => (
                <div className='join'>                  
                  <div
                    key={number}
                    onClick={() => paginate(number)}
                    className={`join-item btn btn-sm shadow-md text-xs sm:text-md transition delay-50 ${
                      currentPage === number
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-blue-400/30'
                    }`}
                  >
                    {number}
                  </div>                
                  <button
                    key={index+1}
                    onClick={() => paginate(index)}
                    className={`px-4 py-2 shadow-md text-sm sm:text-md join-item transition delay-50 hidden ${
                      currentPage === index
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-blue-400/30'
                    }`}
                  >
                    {index}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Indonesia