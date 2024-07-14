import PropTypes from 'prop-types';
import axios from 'axios';
import { getExpenseListURL } from '../../libraryfunctions/urllib';
import { Expense } from './Expense';
import { useState, useEffect} from 'react'

export const ExpenseList = props => {

    const [expenseList, setExpenseList] = useState(false);

    useEffect(() => {
        let url = getExpenseListURL(props.linkedActivity);
        if (url != null) {
            axios.get(url).then((response) => {
                if (response.data != null) {
                    console.log(response.data);
                    console.log(getExpenseListURL(props.linkedActivity))
                }
                setExpenseList(response.data);
            });
        }
    }, []);

    return (
        <div>
            {expenseList ? expenseList.map(expense => (
                <div key={expense.id}>
                    <Expense expense={expense} useMockData={false} />
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