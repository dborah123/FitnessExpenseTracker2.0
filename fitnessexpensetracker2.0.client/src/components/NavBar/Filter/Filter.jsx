import PropTypes from 'prop-types';
import { ActivityTypes } from '../../../libraryfunctions/ActivityType';
import './styles/filter.css';

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
    }

    const activityTypeOptions = generateActivityTypeOptions();

    return (
        <>
            <div className="filter-flex-container">
                <div className="filter-flex-item filter-group">
                    <select
                        name="expenseType"
                        onChange={filterCallback}
                        className="filter-field"
                    >
                        {activityTypeOptions}
                    </select>
                </div>
                <div className="flex-item">
                LOGO
                </div>
            </div>

        </>
    );
}

Filter.propTypes = {
    filterCallback: PropTypes.func,
}