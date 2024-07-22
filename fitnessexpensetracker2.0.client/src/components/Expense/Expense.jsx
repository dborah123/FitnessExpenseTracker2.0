import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';
import { EditExpense } from './EditExpense';

export const Expense = props => {


    let expense = null;

    if (props.useMockData) {
        expense = MockExpense;
    }
    else {
        expense = props.expense;
    }

    return (
        <EditExpense isVisible={true} expense={expense} />
    );
}

Expense.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool
};