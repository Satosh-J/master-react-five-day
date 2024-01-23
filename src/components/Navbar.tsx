import { NavLink } from 'react-router-dom';


export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <a className="navbar-brand" href="#">LOGO</a>
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) => { return `nav-link ${isActive && 'active'}` }}
                            to="/welcome"
                            children='Welcome'
                        />
                    </li>
                    <li className="nav-item"
                    >
                        <NavLink
                            className={({ isActive }) => { return `nav-link ${isActive && 'active'}` }}
                            to="/users"
                            children='Users'
                        />
                    </li>
                    <li className="nav-item"
                    >
                        <NavLink
                            className={({ isActive }) => { return `nav-link ${isActive && 'active'}` }}
                            to="/admin"
                            children='Admin'
                        />
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive }) => { return `nav-link ${isActive && 'active'}` }}
                            to="/about"
                            children='About'
                        />
                    </li>
                </ul>
            </div>
        </nav>
    )
}