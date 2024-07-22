import PropTypes from 'prop-types';
import { MockExpense } from '../../assets/MockData';
import { useState } from 'react';
import { EditExpense } from './EditExpense';
import { MdOutlineEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import './styles/expense.css';

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
        <div className="expense flex-container">

            {!isVisible ?
                <div>
                    <div className="expense-content">
                        {expense.name} for ${expense.amount} {expense.id}
                    </div>
 
                </div>
                : null}
            <button className="edit-btn btn-flex-container" onClick={toggleVisibility}>
                <div className="btn-flex-item">
                    <IconContext.Provider value={{ size: '20px' }}>
                        <div>
                            <MdOutlineEdit />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="btn-flex-item">
                    Edit
                </div>
            </button>
            <EditExpense isVisible={isVisible} expense={expense} shouldRefresh={shouldRefresh} />
        </div>
    )
}

Expense.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool
};