import PropTypes from 'prop-types';
import { FaMountain } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Filter } from './Filter/Filter';
import { Nav, NavLogo, NavLink, NavMenu } from "./styles/NarBarStyle";
import "./styles/NavBar.css";


export const NavBar = (props) => {
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


                <NavMenu>
                    <NavLink
                        to="/"
                        className="navbar-item"
                    >
                        Activities
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="navbar-item"
                    >
                        Statistics
                    </NavLink>
                    <div className="navbar-item">
                        <Filter
                            filterCallback={props.filterCallback}
                        />
                    </div>

                </NavMenu>
            </Nav>
        </>
    );
}

NavBar.propTypes = {
    filterCallback : PropTypes.func,
}