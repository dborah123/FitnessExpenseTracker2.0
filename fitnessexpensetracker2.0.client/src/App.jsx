import './App.css';
import { ActivityList } from './components/Activity/ActivityList';
import { StravaLogin } from './components/Login/Login';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { getRegisterClientURL } from './libraryfunctions/urllib';

function App() {

    const getAccessCodeQueryParam = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('code');
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [athlete, setAthlete] = useState(false);

    const code = getAccessCodeQueryParam();

    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            console.log("effect applied - only on the FIRST mount");
        }

        if (!effectRan.current && code != null && !isLoggedIn) {
            axios.get(getRegisterClientURL(code)).then(response => {

                let responseData = JSON.parse(response.data);
                console.log(responseData);

                if (responseData.errors == null) {
                    setAthlete(response.data);
                    setIsLoggedIn(true);
                }

            });
        }

        return () => effectRan.current = true;
    }, []);

    return (
        <div>
            <h1 id="tabelLabel">Fitness Expense Tracker</h1>
            {
                isLoggedIn && athlete ? <ActivityList useMockData={true} athlete={JSON.parse(athlete)} />
                    : <StravaLogin />
            }
        </div>
    );
}

export default App;