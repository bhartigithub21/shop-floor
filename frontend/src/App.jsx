import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import OutputJournalPage from "./Pages/OutputJournalPage";
import Charts from "./Pages/charts";

function App() {
  // console.log("Dfdfdf", "sdsd")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charts" element={<Charts />} />
        <Route
          path="/output-journal/:documentNo/:lineNo"
          element={<OutputJournalPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
