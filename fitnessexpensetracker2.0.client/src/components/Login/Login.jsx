import { getAuthURL } from '../../libraryfunctions/urllib';
import './styles/login.css';
import Logo from '../../assets/strava-mobile-black.svg';

export const StravaLogin = () => {
    const handleClick = () => {
        // Ask for auth
        window.location.replace(getAuthURL());
    }

    return (
        <div id="login-container">
            <button id="login-button" className="flex-container" onClick={handleClick}>
                <div className="flex-item">
                    <img id="strava-logo" alt="strava logo" src={Logo} />
                </div>
                <div className="flex-item">
                    Authenticate with Strava
                </div>
            </button>
        </div>
    );
}