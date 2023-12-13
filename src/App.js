import NavBar from './navbar'; 
import Students from './components/Students'
import Dashboard from "./components/Dashboard";
import Visits from './components/Visits';
import StudentDetails from './components/StudentDetails';
import { HashRouter, Route, Routes, Switch } from "react-router-dom"


import './navbar.css'
import './css/app.css'
function App() {


    return (

        <>
        <NavBar />
            <Routes>
                <Route path="/" element = {<Dashboard />} />
                <Route path="/students/*" element = {<Students />} />
                <Route path="/visits" element = {<Visits />} />
                <Route path="/students/:idNumber" element={<StudentDetails />} />

            </Routes>
        </>
    )
}


export default App