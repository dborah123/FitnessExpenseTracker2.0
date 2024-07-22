import { MockActivity } from '../../assets/MockData'
import PropTypes from 'prop-types';
import { ExpenseList } from '../Expense/ExpenseList';
import { LuBike } from "react-icons/lu";
import { FaSkiing, FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import './styles/activity.css';
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
    } else {
        activityType = "Mountain Bike Ride"
    }

    let datetime = new Date(activity['start_date_local']);
    let formattedDate = getFormattedDate(datetime);

    return (
        <div className="activity-header vert-flex-container">
            <div className="flex-container vert-flex-item">
                <div className="flex-item activity-icon" >
                    <IconContext.Provider value={{ size: '50px' }}>
                        <div>
                            <LuBike />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="flex-item activity-info ">
                    <div className="grid-container">
                        <div className="grid-item grid-item-left-col">
                            <h3 className="override">Activity Name: </h3>
                        </div>
                        <div className="grid-item">
                            <h3 className="override">{activity["name"]}</h3>
                        </div>
                        <div className="grid-item grid-item-left-col">
                            <h3 className="override">Type: </h3> 
                        </div>
                        <div className="grid-item">
                            <h3 className="override">{activityType}</h3>
                        </div>
                        <div className="grid-item grid-item-left-col">
                            <h3 className="override">Date: </h3>
                        </div>
                        <div className="grid-item">
                            <h3 className="override">{formattedDate}</h3>
                        </div>
                    </div>

                </div>
                <div className="flex-item flex-item-left">
                    <button className="add-button btn-flex-container" onClick={toggleVisibility}>
                        <div className="btn-flex-item">
                            <IconContext.Provider value={{ size: '15px' }}>
                                <div>
                                    <FaPlus />
                                </div>
                            </IconContext.Provider>
                        </div>
                        <div className="btn-flex-item">
                            Add
                        </div>
                    </button>
                </div>
            </div>
            <div className="vert-flex-item">
                <ExpenseList linkedActivity={activity.id} />

                <EditExpense
                    isVisible={isVisible}
                    addExpense={true}
                    linkedActivity={activity.id}
                    toggleExpenseVisability={toggleVisibility}
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

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

Activity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
        start_date_local: PropTypes.string,
    }),
};

MountainBikingActivity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
        start_date_local: PropTypes.string,
    }),
};

SkiingActivity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
        start_date_local: PropTypes.string,
    }),
};

