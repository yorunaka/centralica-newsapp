import React from 'react'
import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const Saved = () => {
  const { saveItems, storedValue } = useLocalStorage('savedArticles', []);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const cleanDescription = (description) => {
    return description ? description.replace(/\[\+\d+ chars\]/, '').trim() : 'No description available'
  }

  const handleDeleteNews = (index) => {
    const updateNews = storedValue.filter((_, i) => i !== index)
    saveItems(updateNews)
  }

  const deletedNewsPopUp = (index) => {
    setSelectedIndex(index)
    setIsPopUpOpen(true)
  }

  const closePopUp = () => {
    setIsPopUpOpen(false)
    setSelectedIndex(null)
  };

  const confirmDeleteNews = () => {
    if (selectedIndex !== null) {
      handleDeleteNews(selectedIndex)
      closePopUp()
    }
  };

  return (
    <div>
      <div className="overflow-x-auto p-36 pt-12">
      {storedValue.length == 0 ? (
            <div className='text-center text-4xl'>No Saved News.</div>
          ) : (
        <table className="table w-full">
          <thead>
            <tr className='text-lg'>
              <th className='w-1/3'>Title</th>
              <th className='w-1/3'>Description</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {storedValue.map((article, index) => (
            <tr key={index}>
              <td>
                <div className="">
                  <div>
                    <div className="font-semibold">{article.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className='line-clamp-3'>
                {cleanDescription(article.content)}
              </td>
              <td>
                {article.author}
              </td>
              <th className='flex flex-row gap-4 h-full mx-auto'>
                <a href={article.url}>
                  <button className="btn font-medium bg-orange-400/80 px-3 py-2 rounded-md hover:bg-orange-600/60">News Page</button>
                </a>
                <label htmlFor='deleteNewsPopUp' className="btn font-medium bg-red-500/80 px-3 py-2 rounded-md hover:bg-red-600/90 hover:text-white"
                onClick={() => deletedNewsPopUp(index)}>Delete</label >
              </th>
            </tr>

            ))}
          </tbody>
        </table>
          )}
          {isPopUpOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 " id='deleteNewsPopUp'>
              <div className="bg-red-200 p-6 rounded-md shadow-md w-96">
                <h3 className="text-xl font-bold mb-4">Delete News</h3>
                <p>Are you sure you want to delete this news?</p>
                <div className="flex justify-end mt-6 gap-4">
                  <button
                  htmlFor='deleteNewsPopUp'
                    className="btn px-4 py-2 rounded-md bg-gray-500/80 hover:bg-gray-500 text-white"
                    onClick={closePopUp}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    onClick={confirmDeleteNews}
                  >
                    Delete
                  </button>
                </div>
              </div>
              </div>
              )}
      </div>
    </div>
  )
}

export default Saved