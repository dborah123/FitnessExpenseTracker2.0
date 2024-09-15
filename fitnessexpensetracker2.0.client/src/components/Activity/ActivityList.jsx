import { MockActivityList } from '../../assets/MockData';
import { getStravaActivitiesURL } from '../../libraryfunctions/urllib';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Activity } from './Activity';
import { useEffect, useState, useRef, useCallback } from 'react';

export const ActivityList = props => {

    const [activities, setActivities, setShouldRefresh] = useState(false);
    const effectRan = useRef(false);

    if (props.useMockData && activities == false) {
        setActivities(MockActivityList);
    }

    useEffect(() => {

        let accessToken = props.athlete.access_token;

        if (!effectRan.current
            && activities == false
            && accessToken != null 
            && !props.useMockData) {

            axios.get(getStravaActivitiesURL(accessToken)).then(response => {

                if (response.errors == null) {
                    setActivities(response.data);
                }

            });
        }

        return () => effectRan.current = true;
    })

    const refresh = useCallback(val => {
        setShouldRefresh(val);
    }, [setShouldRefresh]);

    return (
        <div>
            {activities ? activities.map(activity => (
                <div key={activity.id}>
                    <Activity
                        activity={activity}
                        refreshState={refresh}
                        refreshExpense={refresh}
                        filterValue={props.filterValue}
                    />
                </div>
            )) : null}
        </div>
    );
}

ActivityList.propTypes = {
    athlete: PropTypes.object,
    useMockData: PropTypes.bool,
    filterValue: PropTypes.number,
};

