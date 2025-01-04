import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (

    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </NoteState >

  );
}

export default App;
