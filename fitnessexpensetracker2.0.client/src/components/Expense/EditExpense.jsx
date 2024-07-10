import PropTypes from 'prop-types';
import { useFormik } from 'formik'
import { ExpenseTypes, ConvertDate } from './ExpenseLib'

export const EditExpense = props => {

    let expense = props.expense;
    
    const formik = useFormik({
        initialValues: {
            name: expense.name,
            amount: '' + expense.amount,
            purchaseDate: ConvertDate(expense.purchaseDate),
            expenseType: expense.expenseType,
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const options = [];
    for (let [key, value] of Object.entries(ExpenseTypes)) {
        options.push(
            <option key={key} value={value}>
                {key}
            </option>
        );
    }

    return (
        <div>
            {
                props.isVisible ? (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name" >Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required={true}
                        />
                        <label htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            required={true}
                        />
                        <label htmlFor="purchaseDate">Purchase Date</label>
                        <input
                            id="purchaseDate"
                            name="purchaseDate"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.purchaseDate}
                            required={true}
                        />
                        <label htmlFor="expenseType">Expense Type</label>
        
                        <select
                            id="expenseType"
                            name="expenseType"
                            onChange={formik.handleChange}
                            value={formik.values.expenseType}
                            required={true}
                        >
                            {options}
                        </select>
                        {formik.errors.expenseType && formik.touched.expenseType ? <div>{formik.errors.expenseType}</div> : null}

                        <button type="submit">Submit</button>
                    </form>
                ) : null
            }
        </div>

    );
}

const validate = values => {
    const errors = {};

    if (values.expenseType === "") {
        errors.expenseType = "Expense type is required";
    }

    return errors;
}

EditExpense.propTypes = {
    isVisible: PropTypes.bool,
    expense: PropTypes.object,
};