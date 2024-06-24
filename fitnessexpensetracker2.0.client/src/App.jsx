import { useEffect } from 'react';
import './App.css';
import { ActivityList } from './components/Activity/ActivityList'

function App() {

    useEffect(() => {
        async function fetchData() {
            //const stravaAuthResponse = await axios.get(GetURL());
            //console.log(stravaAuthResponse)
            GetURL();
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 id="tabelLabel">Fitness Expense Tracker</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <ActivityList useMockData={true} />
        </div>
    );
    
    function GetURL() {
        var url = new URL('https://www.strava.com/oauth/authorize');
        url.searchParams.append('client_id', 126500);
        url.searchParams.append('redirect_uri', 'https://localhost:5173/');
        url.searchParams.append('response_type', 'code');
        url.searchParams.append('scope', 'activity:read')

        return url;
    }
}

export default App;