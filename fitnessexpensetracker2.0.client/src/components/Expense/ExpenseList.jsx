import PropTypes from 'prop-types';
import axios from 'axios';
import { getExpenseListURL } from '../../libraryfunctions/urllib';
import { useState, useEffect} from 'react'
import { Expense } from './Expense';

export const ExpenseList = props => {

    const [expenseList, setExpenseList] = useState(false);

    useEffect(() => {
        let url = getExpenseListURL(props.linkedActivity);
        if (url != null) {
            axios.get(url).then((response) => {
                setExpenseList(response.data);
            });
        }
    }, []);

    return (
        <div>
            {expenseList ? expenseList.map(expense => (
                <div key={expense.id}>
                    <Expense isVisible={true} expense={expense} />
                </div>
            )) : null}
        </div>
    )
}

ExpenseList.propTypes = {
    expense: PropTypes.object,
    useMockData: PropTypes.bool,
    linkedActivity: PropTypes.number,
};