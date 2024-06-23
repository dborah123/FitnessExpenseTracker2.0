import PropTypes from 'prop-types';
import { MockExpenseList } from '../../assets/MockData';
import axios from 'axios';
import { getExpenseListURL } from '../../libraryfunctions/urllib';
import { Expense } from './Expense';

async function fetchExpenseData() {
    const stravaActivityData = await axios.get(getExpenseListURL());
    console.log(stravaActivityData)

    return stravaActivityData;
}

export const ExpenseList = props => {

    let expenseList = null;

    if (props.useMockData) {
        expenseList = MockExpenseList;
    }
    else {
        expenseList = fetchExpenseData();
    }

    return (
        <div>
            {expenseList.map(expense => (
                <div key={expense.Id}>
                    <Expense activity={expense} useMockData={true} />
                </div>
            ))}
        </div>
    )
}

ExpenseList.propTypes = {
    expense: PropTypes.shape({
        expense: PropTypes.object
    }),
    useMockData: PropTypes.shape({
        useMockData: PropTypes.Boolean
    })
};