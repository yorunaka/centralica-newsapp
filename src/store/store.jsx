import { createStore } from 'redux'
import { newsReducer } from './reducers/reducers'

const store = createStore(newsReducer)

export default store