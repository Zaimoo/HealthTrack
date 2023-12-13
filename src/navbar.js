import { NavLink } from "react-router-dom";
import logo from './logo.png'


export default function NavBar() {
    return (
        <nav className="nav">
        <img src={logo} className="app-logo" alt="logo" />
            <ul>
                <li>
                <NavLink to="/" >
                            Dashboard
                    </NavLink>

                </li>
                <li>
                    <NavLink to="/students">
                            Students
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/visits" >
                            Visits
                    </NavLink>
                </li>
            </ul>
        </nav>
    )

}