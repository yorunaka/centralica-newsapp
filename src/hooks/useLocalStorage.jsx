import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    
    const getStoredValue = () => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue 
        } catch (error) {
            console.log('error', key, error)
            return initialValue
        }
    }
    
    const [storedValue, setStoredValue] = useState(() => getStoredValue())

    const saveItems = (value) => {
        try {
            const newValue = typeof value === 'function' ? value(storedValue) : value
            setStoredValue(newValue)
            window.localStorage.setItem(key, JSON.stringify(newValue))
          } catch (error) {
            console.error('Error saving to localStorage', error)
          }
    }

    const handleDuplicate = (article) => {
        const isDuplicate = storedValue.some((storedArticle) => storedArticle.title == article.title)
        if(isDuplicate){
            // console.log('berita yang sama sudah tersimpan')
            alert('Berita yang sama sudah tersimpan.')
            return false
        } else {
            // console.log('berita tersimpan')
            saveItems([...storedValue, article])
            alert('Berita tersimpan.')
            return true
        }
    }

  return {storedValue, saveItems, handleDuplicate}
  
}

export default useLocalStorage