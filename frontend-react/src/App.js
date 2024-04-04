import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddJobTitle from "./job-titles/AddJobTitle";
import EditUser from "./job-titles/EditJobTitle";
import ViewJobTitle from "./job-titles/ViewJobTitle";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/add-job-title" element={<AddJobTitle />} />
                    <Route exact path="/edit-job-title/:id" element={<EditUser />} />
                    <Route exact path="/view-job-title/:id" element={<ViewJobTitle />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;