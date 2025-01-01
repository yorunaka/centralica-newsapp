import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
