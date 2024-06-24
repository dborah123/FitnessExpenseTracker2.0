import { MockActivityList } from '../../assets/MockData';
import { getStravaActivitiesURL } from '../../libraryfunctions/urllib';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Activity } from './Activity';

async function fetchActivityData() {
    const stravaActivityData = await axios.get(getStravaActivitiesURL());
    console.log(stravaActivityData)

    return stravaActivityData;
}

export const ActivityList = props => {

    let activityList = null;

    if (props.useMockData) {
        activityList = MockActivityList;
    }
    else {
        activityList = fetchActivityData();
    }

    return (
        <div>
            {activityList.map(activity => (
                <div key={activity.id}>
                    <Activity activity={activity} />
                </div>
            ))}
        </div>
    );
}

ActivityList.propTypes = {
    useMockData: PropTypes.bool
};

