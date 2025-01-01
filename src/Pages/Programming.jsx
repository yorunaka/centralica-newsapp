import React from 'react'
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSelector } from 'react-redux'
import usePagination from '../hooks/usePagination'

 
const Programming = (props) => {
  const news = useSelector((state) => state.newsData)
  const { handleDuplicate } = useLocalStorage('savedArticles', [])
  const [loading, setLoading] = useState(true)
  const { currentNewsPage, paginate, pageNumbers, currentPage } = usePagination(news || [])


  const cleanDescription = (description) => {
    return description ? description.replace(/\[\+\d+ chars\]/, '').trim() : 'No description available'
  }

  useEffect(() => {
    setLoading('true')
    const fetchData = async () => {
      try {
        await props.getNewsData('programming')
      } catch (error) {
        console.error('Error fetching news:', error)
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
      <div id='title' className='text-center text-3xl pt-6 font-bold'>
        Programming News
      </div>
      {loading ? (
        <div className='flex flex-col items-center'>
        <div className='pt-24 loading loading-ring loading-lg'>
        </div>
          <div className='text-black text-2xl'>
            Fetching News...
        </div>
        </div>
      ) : (
        <div>
        <div className="grid grid-cols-3 p-36 pt-4 pb-6">
        {currentNewsPage.map((article, index) => (
          <div className="grid grid-flow-row m-6 gap-2" key={index}>
            <div className="text-sm">
              {article.source.name}
            </div>
            <div className="text-lg font-semibold" id="title">
              {article.title}
            </div>
            <div className="text-gray-500/90" id="writer">
              {article.author}
            </div>
            <div className="text-md line-clamp-3" id="desc">
              {cleanDescription(article.content) || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto officiis voluptatibus distinctio dolorum. Fugiat, nemo cumque dolorem facere a consectetur. Eius quam unde similique velit praesentium alias deserunt a adipisci amet rerum!"}
            </div>
            <div className="flex flex-row gap-4">
                <a href='' onClick={(e)=> {
                  e.preventDefault()
                  window.open(`${article.url}`, "_blank")
                }} rel="noopener noreferrer">
                  <div className="h-10 flex w-fit p-4 bg-orange-400/70 rounded-lg hover:bg-orange-400/50 text-center place-items-center justify-center items-center">
                  Read More...
                  </div>
                </a>                
                <button className="h-10 items-center flex justify-center w-20 bg-blue-400/70 rounded-lg hover:bg-blue-400/50"
                onClick={(e) => {
                  e.preventDefault()
                  handleDuplicate(article)}}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
      {pageNumbers.length > 0 && (
        <div className="join flex justify-center mt-4 pb-20">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 shadow-md join-item ${currentPage === number ? 'bg-blue-500 hover:bg-blue-600 transition delay-50 text-white' : 'bg-gray-200 hover:bg-blue-400/30 transition delay-50'}`}
          >
            {number}
          </button>
        ))}
      </div>
        )}
        </div>
      )}
    </div>
  )
}

export default Programming