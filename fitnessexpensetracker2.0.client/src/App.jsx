import './App.css';
import { ActivityList } from './components/Activity/ActivityList';
import { StravaLogin } from './components/Login/Login';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { getRegisterClientURL } from './libraryfunctions/urllib';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { ActivityTypes } from './libraryfunctions/ActivityType';
import { StatisticsTab } from './components/Statistics/StatisticsTab';



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
        document.title = "Fitness Expense Tracker";
    }, []);

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
    }, [code, isLoggedIn]);

    return (
        <Router> 
            <div className="vert-itm"> 
                <NavBar filterCallback={filterCallback} /> 
            </div> 
            <div className="vert-itm">
                <Routes>
                    <Route
                        path="/"
                        element={(isLoggedIn && athlete) ? (
                                <ActivityList useMockData={false} athlete={athlete} filterValue={filter} />
                            ) : (
                                <StravaLogin />
                            )
                        }
                    />
                    <Route
                        path="/statistics"
                        element={<StatisticsTab />}
                    />
                </Routes>
            </div>
        </Router>
    );
}


export default App;