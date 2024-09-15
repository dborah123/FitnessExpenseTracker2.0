import PropTypes from 'prop-types';
import { FaMountain } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Filter } from '../Filter/Filter';
import { Nav, NavLink, NavLogo, NavMenu } from "./styles/NarBarStyle";
import "./styles/NavBar.css"


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
                        activestyle={{ color: 'black' }}
                    >
                        Activities
                    </NavLink>
                    <NavLink
                        to="/about"
                        activestyle={{ color: 'black' }}
                    >
                        Statistics
                    </NavLink>
                    <Filter filterCallback={props.filterCallback} />
                </NavMenu>
            </Nav>
        </>
    );
}

NavBar.propTypes = {
    filterCallback : PropTypes.func,
}