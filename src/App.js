import React from "react";
import ExamComponent from "./components/ExamComponent";
import ElementPedagogiquePage from "./components/ElementPadagogique";
import AdminComponent from "./components/AdminComponent";
import EnseignantComponent from "./components/EnseignantComponent";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
function App() {
  return (


      <Router>
        <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/exam" element={<ExamComponent />} /> {/* Define route for Exam component */}
        <Route path="/elem" element={<ElementPedagogiquePage/>} />
        <Route path="/enseignants" element={<EnseignantComponent/>} />
        <Route path="/admins" element={<AdminComponent/>} />
      </Routes>
    </Router>

  );
}

export default App;
/**<ExamComponent />*/
