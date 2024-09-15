import PropTypes from 'prop-types';
import { ActivityTypes } from '../../libraryfunctions/ActivityType';

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
            <div className="flex-item form__group field">
                <label className="form__label" htmlFor="expenseType">Activity</label>
                <select
                    id="expenseType"
                    name="expenseType"
                    onChange={filterCallback}
                >
                    {activityTypeOptions}
                </select>
            </div>
        </>
    );
}

Filter.propTypes = {
    filterCallback: PropTypes.func,
}