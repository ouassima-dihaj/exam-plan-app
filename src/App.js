import React from "react";
import ExamComponent from "./components/ExamComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
function App() {
  return (


      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/exam" element={<ExamComponent />} /> {/* Define route for Exam component */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
}

export default App;
/**<ExamComponent />*/
