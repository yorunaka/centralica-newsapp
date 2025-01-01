import { useState } from 'react'

const usePagination = (data = [], itemsPerPage = 9) => {
  const [ currentPage, setCurrentPage] = useState(1)
  const [ newsPerPage ] = useState(itemsPerPage)

  const lastNewsIndex = currentPage * newsPerPage
  const firstPageIndex = lastNewsIndex - newsPerPage

  const currentNewsPage = data.slice(firstPageIndex, lastNewsIndex)

  const totalPages = Math.ceil(data.length / newsPerPage)
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++){
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return ({    
    currentNewsPage,
    paginate,
    pageNumbers,
    currentPage,
    totalPages
  })
}

export default usePagination