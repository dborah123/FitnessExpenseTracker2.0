import { getAuthURL } from '../../libraryfunctions/urllib';

export const StravaLogin = () => {
    const handleClick = () => {
        // Ask for auth
        window.location.replace(getAuthURL());
    }

    return (
        <div>
            <button onClick={handleClick}>Authenticate with Strava</button>
        </div>
    );
}