import { getAuthURL } from '../../libraryfunctions/urllib';
import './styles/login.css';

export const StravaLogin = () => {
    const handleClick = () => {
        // Ask for auth
        window.location.replace(getAuthURL());
    }

    return (
        <div id="login-container">
            <button id="login-button" onClick={handleClick}>Authenticate with Strava</button>
        </div>
    );
}