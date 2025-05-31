import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Songs from './pages/Songs'
import Register from './pages/register.tsx'
import Login from './components/login/login.tsx'
import Chat from './pages/Chat.tsx'
import ChatWindow from './components/chatWindow/chatWindow.tsx'
import Exam from './pages/exam.tsx' // Adjust the path if your Exam component is located elsewhere


function App() { 
  return (
    <Router>
      <div className='App'>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/register" element={<Register />} /> {/* ✅ real page */}
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat/>} /> {/* Placeholder for Chat page */}
          <Route path="/chat-window" element={<ChatWindow />} /> {/* Placeholder for ChatWindow */}
          <Route path="/exam" element={<Exam />} /> {/* Placeholder for Exam page */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
