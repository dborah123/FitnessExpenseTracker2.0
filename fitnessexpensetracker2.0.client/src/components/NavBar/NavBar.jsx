import { FaMountain } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Nav, NavLink, NavLogo, Bars, NavMenu } from "./styles/NarBarStyle";
import "./styles/NavBar.css"


export const NavBar = () => {
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    <div className="logo">
                        <div id="mountain">
                            <IconContext.Provider value={{ size: "3em" }}>
                                <div>
                                    <FaMountain />
                                </div>
                             </IconContext.Provider>
                        </div>
                        <div id="header">
                           <h1 >Fitness Expense Tracker</h1>
                        </div>
                    </div>
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activestyle={{ color: 'black' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        activestyle={{ color: 'black' }}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        activestyle={{ color: 'black' }}
                    >
                        Contact
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
}