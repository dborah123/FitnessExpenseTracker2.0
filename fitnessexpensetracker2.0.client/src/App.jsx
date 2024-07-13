import './App.css';
import { ActivityList } from './components/Activity/ActivityList';

function App() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    console.log(code)


    const handleClick = () => {
        // Ask for auth
        window.location.replace(getAuthURL());
    }

    return (
        <div>
            <h1 id="tabelLabel">Fitness Expense Tracker</h1>
            {
                code ? <ActivityList useMockData={true} />
                : <button onClick={handleClick}>Authenticate with Strava</button>
            }
            
            
        </div>
    );
}

function getAuthURL() {
    const clientId = import.meta.env.VITE_APP_CLIENT_ID
    const websiteURL = import.meta.env.VITE_APP_WEBSITE_URL

    return `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${websiteURL}&approval_prompt=force&scope=read`;
}

export default App;