import { MockActivity } from '../../assets/MockData'
import PropTypes from 'prop-types';
import { ExpenseList } from '../Expense/ExpenseList';
import { LuBike } from "react-icons/lu";
import { FaSkiing } from "react-icons/fa";

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

    return (
        <div>
            <LuBike />
            <h3>{activity["name"]}</h3>
            {activity["sport_type"]}

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
            {activity["sport_type"]}

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

