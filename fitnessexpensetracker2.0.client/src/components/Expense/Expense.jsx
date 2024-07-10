import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';
import { useState } from 'react';
import { EditExpense } from './EditExpense'

export const Expense = props => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


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
            <button onClick={toggleVisibility}>Edit</button>
            <EditExpense isVisible={isVisible} expense={expense} />
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool
};