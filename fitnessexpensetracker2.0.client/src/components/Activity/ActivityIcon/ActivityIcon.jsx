import PropTypes from 'prop-types';
import { IconContext } from "react-icons";
import { LuBike } from "react-icons/lu";
import { FaSkiing } from "react-icons/fa";
import { StravaActivityTypes } from '../../../libraryfunctions/ActivityType';

export const ActivityIcon = (props) => {

    const getActivityIcon = (activityType) => {
        switch (activityType) {
            case StravaActivityTypes.Ride:
            case StravaActivityTypes.MTBRide:
                return LuBike;
            case StravaActivityTypes.Skiing:
                return FaSkiing;
            default:
                return "";
        }
    }

    const Icon = getActivityIcon(props.activityType);

    return (
        <>
            <IconContext.Provider value={props.values}>
                <div>
                    <Icon />
                </div>
            </IconContext.Provider>
        </>
    )
}

ActivityIcon.propTypes = {
    activityType: PropTypes.string,
    values: PropTypes.object,
};