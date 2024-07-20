import './App.css';
import { ActivityList } from './components/Activity/ActivityList';
import { StravaLogin } from './components/Login/Login';
import { Header } from './components/Header/Header';
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

        if (!effectRan.current && code != null && !isLoggedIn) {
            axios.get(getRegisterClientURL(code)).then(response => {

                let responseData = JSON.parse(response.data);

                if (responseData.errors == null) {
                    console.log(responseData);
                    setAthlete(responseData);
                    setIsLoggedIn(true);
                }

            });
        }

        return () => effectRan.current = true;
    }, []);

    return (
        <div>
            <Header />
            {
                isLoggedIn && athlete ? <ActivityList useMockData={false} athlete={athlete} />
                    : <StravaLogin />
            }
        </div>
    );
}

export default App;