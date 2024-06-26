import { MockActivity } from '../../assets/MockData'
import PropTypes from 'prop-types';
import { ExpenseList } from '../Expense/ExpenseList';
import { LuBike } from "react-icons/lu";
import { FaSkiing } from "react-icons/fa";
import { IconContext } from '../../../../node_modules/react-icons/lib/iconContext';
import './activity.css'

export const Activity = props => {

    let activity = null;

    if (props.activity != null) {
        activity = props.activity;
    }
    else {
        activity = MockActivity;
    }

    if (activity["sport_type"] == "Ride" || activity["sport_type"] == "MountainBikeRide") {
        return (
            <div>
                <MountainBikingActivity activity={activity} />
            </div>
        )
    }
    else {
        return (
            <div>
                <SkiingActivity activity={activity} />
            </div>
        )
    }

    
}

export const MountainBikingActivity = props => {

    let activity = props.activity;

    let activityType = activity["sport_type"];

    if (activityType == "Ride") {
        activityType = "Road Ride";
    }

    return (
        <div>
            <header id="activity-header">
                <div id="activity-icon">
                    <IconContext.Provider value={{ size: "20em" }}>
                        <div>
                            <LuBike />
                        </div>
                    </IconContext.Provider>
                </div>

                <h3>{activityType}</h3>
            </header>

            <div>
                <ExpenseList useMockData={true} />
            </div>
        </div>
    );
}

export const SkiingActivity = props => {

    let activity = props.activity;

    return (
        <div>
            <FaSkiing />
            <h3>{activity["name"]}</h3>

            <div>
                <ExpenseList useMockData={true} />
            </div>
        </div>
    );
}

Activity.propTypes = {
    activity: PropTypes.shape({
        name: PropTypes.string,
        sport_type: PropTypes.string,
    })
};

MountainBikingActivity.propTypes = {
    activity: PropTypes.shape({
        name: PropTypes.string,
        sport_type: PropTypes.string,
    })
};

SkiingActivity.propTypes = {
    activity: PropTypes.shape({
        name: PropTypes.string,
        sport_type: PropTypes.string,
    }),
};

