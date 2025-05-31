import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Songs from './pages/Songs'
import Register from './pages/register.tsx'
// import Navbar from './components/Navbar/Navbar'
import Chat from './pages/Chat.tsx'

function App() { 
  return (
    <Router>
      <div className='App'>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/register" element={<Register />} /> {/* ✅ real page */}
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/chat" element={<Chat/>  } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
