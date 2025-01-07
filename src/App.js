import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
// import NoteState from './context/notes/NoteState';
function App() {
  return (

    <BrowserRouter>
      <NoteState>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </BrowserRouter>

  );
}

export default App;
