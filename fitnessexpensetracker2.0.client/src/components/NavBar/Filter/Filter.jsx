import PropTypes from 'prop-types';
import { ActivityTypes, InternalToStrava, StravaActivityTypes } from '../../../libraryfunctions/ActivityType';
import './styles/filter.css';
import { ActivityIcon } from '../../Activity/ActivityIcon/ActivityIcon'
import { useState } from 'react';

export const Filter = (props) => {

    const generateActivityTypeOptions = () => {
        const options = [];
        for (let [key, value] of Object.entries(ActivityTypes)) {
            options.push(
                <option key={key} value={value}>
                    {key}
                </option>
            );
        }

        return options;
    }

    const filterCallback = (event) => {
        props.filterCallback(event.target.value);
        setSelection(InternalToStrava(Number(event.target.value)));
    }

    const [selection, setSelection] = useState(StravaActivityTypes.Ride);

    const activityTypeOptions = generateActivityTypeOptions();

    return (
        <>
            <div className="filter-flex-container">
                <div className="filter-flex-item filter-group">
                    <select
                        name="activityType"
                        onChange={filterCallback}
                        className="filter-field"
                    >
                        {activityTypeOptions}
                    </select>
                </div>
                <div className="flex-item">
                    <ActivityIcon
                        activityType={selection}
                        values={{ size: '50px' }}
                    />
                </div>
            </div>

        </>
    );
}

Filter.propTypes = {
    filterCallback: PropTypes.func,
}