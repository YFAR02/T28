import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.tsx'
import Songs from './pages/Songs'
import Register from './pages/register.tsx'
import Login from './components/login/login.tsx'
import Chat from './pages/Chat.tsx'
import ChatWindow from './components/chatWindow/chatWindow.tsx'
import Exam from './pages/exam.tsx' // Adjust the path if your Exam component is located elsewhere
// import Card from './components/card/card.tsx'
import Flashcard from './pages/Flashcard';
import Logout from './pages/Logout.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ResetPassword from './pages/ResetPassword.tsx'


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
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Add more routes as needed */}
          <Route path="/flashcard" element={<Flashcard />} /> {/* Placeholder for Flashcard */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
