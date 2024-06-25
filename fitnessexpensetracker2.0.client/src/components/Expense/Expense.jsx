import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';
import { useState } from 'react';

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
            <EditExpense isVisible={isVisible} />
        </div>
    )
}

export const EditExpense = props => {
    console.log(props.isVisible);
    return (
        <div>
            {
            props.isVisible ? (
                <p>Edit form!</p>
                ) : null
            }
        </div>
    )
}


Expense.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool
};

EditExpense.propTypes = {
    isVisible: PropTypes.bool,
};