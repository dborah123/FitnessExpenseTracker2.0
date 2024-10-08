import './App.css';
import { ActivityList } from './components/Activity/ActivityList';
import { StravaLogin } from './components/Login/Login';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { getRegisterClientURL } from './libraryfunctions/urllib';
import { BrowserRouter, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { ActivityTypes } from './libraryfunctions/ActivityType';

function App() {

    const getAccessCodeQueryParam = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('code');
    }

    const [filter, setFilter] = useState(ActivityTypes.Biking);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [athlete, setAthlete] = useState(false);

    function filterCallback(filterStatus) {
        setFilter(Number(filterStatus));
    }

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
            <div className="vert-itm">
                <BrowserRouter>
                    <NavBar filterCallback={filterCallback} />
                </BrowserRouter>
            </div>
            <div className="vert-itm">
                {
                    isLoggedIn && athlete ? <ActivityList useMockData={false} athlete={athlete} filterValue={filter} />
                        : <StravaLogin />
                }
            </div>
            
        </div>
    );
}

export default App;