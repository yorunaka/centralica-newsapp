import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSelector } from 'react-redux'
import usePagination from '../hooks/usePagination'

const SearchPage = (props) => {
  const [loading, setLoading] = useState(true)
  const searchedNewsData = useSelector((state) => state.newsData)
  const { handleDuplicate } = useLocalStorage('savedArticles', [])
  const { currentNewsPage, paginate, pageNumbers, currentPage } = usePagination(searchedNewsData || [])


  const cleanDescription = (description) => {
    return description ? description.replace(/\[\+\d+ chars\]/, '').trim() : 'No description available'
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await props.getNewsData(props.searchValue) 
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      }
    }

    if (props.searchValue) {
      fetchData()
    }
  }, [props.searchValue])

  return (
    <div>
      {loading ? (
        <div className='flex flex-col items-center'>
          <div className='pt-24 loading loading-ring loading-lg'>
        </div>
          <div className='text-black text-2xl'>
            Fetching News...
          </div>
        </div>
      ) : (
        searchedNewsData.length === 0 ? (
          <div className='grid grid-cols-3 p-36 pt-4 pb-6'>
            Berita dengan keyword {props.searchValue} tidak ditemukan
          </div>
        ) : (
          <div>
            <div id='title' className='text-center text-2xl sm:text-3xl pt-6 font-bold'>
              {props.searchValue} News
            </div>
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
            <div className="flex justify-center mt-4 pb-8 join">
              {pageNumbers.map((number) => (              
                <div
                  key={number}
                  onClick={() => paginate(number)}
                  className={`join-item btn btn-sm btn-square shadow-md text-xs transition delay-50 md:text-md md:btn-md ${
                    currentPage === number
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-blue-400/30'
                  }`}
                >
                  {number}
                </div>    
              ))}
            </div>
          )}
        </div>
            )
      )}

    </div>
  )
}

export default SearchPage