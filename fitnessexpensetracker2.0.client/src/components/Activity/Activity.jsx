import { MockActivity } from '../../assets/MockData'
import PropTypes from 'prop-types';

export const Activity = props => {

    let activity = null;

    if (props.activity != null) {
        activity = props.activity;
    }
    else {
        activity = MockActivity;
    }

    return (
        <div>
            <h1>{activity["name"]}</h1>
            <h3>{activity["sport_type"]}</h3>
        </div>
    );
}

Activity.propTypes = {
    activity: PropTypes.shape({
        activity: PropTypes.object
    })
};
