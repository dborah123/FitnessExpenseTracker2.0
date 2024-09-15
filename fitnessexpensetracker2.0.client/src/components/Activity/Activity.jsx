import PropTypes from 'prop-types';
import { ExpenseList } from '../Expense/ExpenseList';
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import './styles/activity.css';
import { Expense } from '../Expense/Expense';
import { useState } from 'react';
import { getActivityTypeName, isSupportedActivityType, StravaToInternal } from '../../libraryfunctions/ActivityType';
import { ActivityIcon } from './ActivityIcon/ActivityIcon';

export const Activity = props => {
    /**
     * STATE AND HELPER FUNCTIONS
     */
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const shouldFilterActivity = (activityType, filterValue) => {
        return StravaToInternal(activityType) != filterValue;
    }

    const getFormattedDate = (date) => {
        let dateObj = new Date(date);
        let year = dateObj.getFullYear();
        let month = (1 + dateObj.getMonth()).toString().padStart(2, '0');
        let day = dateObj.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year;
    }

    /**
     *  LOGIC
     */

    let activity = props.activity;
    let activityType = activity["sport_type"];

    // If this isn't a supported activity type, exit
    if (!isSupportedActivityType(activityType)) {
        return;
    }

    // If we should filter this activity type, exit
    if (shouldFilterActivity(activityType, props.filterValue)) {
        return;
    }

    let activityTypeName = getActivityTypeName(activityType);
    let formattedDate = getFormattedDate(activity['start_date_local']);

    return (
        <div className="activity-header vert-flex-container">
            <div className="flex-container vert-flex-item">
                <div className="flex-item activity-icon" >
                    <ActivityIcon
                        activityType={activityType}
                        values={{ size: '50px' }}
                    />
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
                            <h3 className="override">{activityTypeName}</h3>
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

                <Expense
                    isVisible={isVisible}
                    addExpense={true}
                    linkedActivity={activity.id}
                    toggleExpenseVisability={toggleVisibility}
                />
            </div>
        </div>
    );
}

Activity.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sport_type: PropTypes.string,
        start_date_local: PropTypes.string,
    }),
    filterValue: PropTypes.number,
};
