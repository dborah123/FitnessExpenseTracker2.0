import PropTypes from 'prop-types';
import axios from 'axios';
import { getExpenseListURL } from '../../libraryfunctions/urllib';
import { Expense } from './Expense';
import React from 'react'

export const ExpenseList = props => {

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(getExpenseListURL(props.linkedActivity)).then((response) => {
            setPost(response.data);
        });
    }, []);

    return (
        <div>
            {post ? post.map(expense => (
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