import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';

export const Expense = props => {

    let expense = null;

    if (props.useMockData) {
        expense = MockExpense;
    }
    else {
        expense = props.expense;
    }

    return (
        <div>
            <div>
                {expense.name} for ${expense.amount}
            </div>
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.shape({
        expense: PropTypes.object
    }),
    useMockData: PropTypes.shape({
        useMockData: PropTypes.Boolean
    })
};