import { MockActivity } from '../../assets/MockData'
import PropTypes from 'prop-types';
import { ExpenseList } from '../Expense/ExpenseList';
import { LuBike } from "react-icons/lu";
import { FaSkiing } from "react-icons/fa";
import { IconContext } from "react-icons";
import './styles/activity.css'
import { EditExpense } from '../Expense/EditExpense';
import { useState } from 'react';

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
                <MountainBikingActivity
                    activity={activity}
                />
            </div>
        )
    }
    else {
        return (
            <div>
                <SkiingActivity
                    activity={activity}
                />
            </div>
        )
    }

    
}

export const MountainBikingActivity = props => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    let activity = props.activity;

    let activityType = activity["sport_type"];

    if (activityType == "Ride") {
        activityType = "Road Ride";
    }

    return (
        <div>
            <div id="activity-header" className="flex-container">
                <div id="activity-icon" className="flex-item" >
                    <IconContext.Provider value={{ size: '50px' }}>
                        <div>
                            <LuBike />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="flex-item">
                    <h3>{activityType}</h3>
                </div>
                <div className="flex-item">
                    <button id="add-button" onClick={toggleVisibility}>Add</button>
                </div>
            </div>

            <div>
                <ExpenseList linkedActivity={activity.id} />
                
                <EditExpense
                    isVisible={isVisible}
                    addExpense={true}
                    linkedActivity={activity.id}
                />
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
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
    }),
};

MountainBikingActivity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
    }),
};

SkiingActivity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
    }),
};

