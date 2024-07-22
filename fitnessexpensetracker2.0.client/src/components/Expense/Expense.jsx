import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';
import { useState } from 'react';
import { EditExpense } from './EditExpense';
import { MdOutlineEdit } from "react-icons/md";

export const Expense = props => {

    const [isVisible, setIsVisible, shouldRefresh] = useState(false);

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
                {expense.name} for ${expense.amount} {expense.id }
            </div>
            <button onClick={toggleVisibility}>Edit</button>
            <EditExpense isVisible={isVisible} expense={expense} shouldRefresh={shouldRefresh} />
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool
};