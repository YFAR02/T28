import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Songs from './pages/Songs'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Navbar/login/login.tsx'

function App() { 
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
