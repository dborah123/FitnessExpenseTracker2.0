import { FaMountain } from "react-icons/fa6";
import './styles/header.css';
import { IconContext } from "react-icons";

export const Header = () => {

    return (
        <div className="align-items">
            <div className="align-text-item">
                <div className="align-content">
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
            </div>
        </div>
    );
}