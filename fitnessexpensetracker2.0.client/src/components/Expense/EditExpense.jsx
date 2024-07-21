import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { ExpenseTypes, ConvertDate } from './ExpenseLib';
import axios from 'axios';
import './styles/editexpense.css';
import { MdOutlineEdit } from "react-icons/md";
import { IconContext } from "react-icons";

export const EditExpense = (props) => {

    let expense = props.expense;

    let linkedActivityId;
    let initialValues;

    if (props.addExpense) {
        linkedActivityId = props.linkedActivity;
        initialValues = {
            name: '',
            amount: '',
            purchaseDate: '',
            expenseType: '',
        }
    } else {
        linkedActivityId = expense.linkedActivity;
        initialValues = {
            name: expense.name,
            amount: '' + expense.amount,
            purchaseDate: ConvertDate(expense.purchaseDate),
            expenseType: expense.expenseType,
        }
    }
    
    const formik = useFormik({
        initialValues: initialValues,
        validate,
        onSubmit: values => {
            values.linkedActivity = String(linkedActivityId);
            values.expenseType = Number(values.expenseType);
            values.stravaUserID = "123";

            if (props.addExpense) {
                axios.post('https://localhost:7241/api/Expenses/', values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                values.id = expense.id;
                values.linkedActivity = linkedActivityId;
                values.sportsType = expense.sportsType;
                values.stravaUserID = expense.stravaUserID;
                values.purchaseDate = expense.purchaseDate;

                axios.put('https://localhost:7241/api/Expenses/' + expense.id, values)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
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
                    <div>
                        <form className="flex-container" onSubmit={formik.handleSubmit}>
                            <div className="flex-item form__group field">
                                <label className="form__label" htmlFor="name" >Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    required={true}
                                    className="form__field"
                                />
                            </div>

                            <div className="flex-item form__group field">
                                <label className="form__label" htmlFor="amount">Amount</label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.amount}
                                    required={true}
                                    className="form__field"
                                />
                            </div>

                            <div className="flex-item form__group field">
                                <label className="form__label" htmlFor="purchaseDate">Purchase Date</label>
                                <input
                                    id="purchaseDate"
                                    name="purchaseDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    value={formik.values.purchaseDate}
                                    required={true}
                                    className="form__field"
                                />
                            </div>

                            <div className="flex-item form__group field">
                                <label className="form__label" htmlFor="expenseType">Expense Type</label>
                                <select
                                    id="expenseType"
                                    name="expenseType"
                                    onChange={formik.handleChange}
                                    value={formik.values.expenseType}
                                    required={true}
                                    className="form__field"
                                >
                                    {options}
                                </select>
                            </div>

                            <div className="flex-item">
                                <button className="edit-btn btn-flex-container" type="submit">
                                    <div className="btn-flex-item">
                                        <IconContext.Provider value={{ size: '20px' }}>
                                            <div>
                                                <MdOutlineEdit />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                    <div className="btn-flex-item">
                                        Submit
                                    </div>
                                </button>
                            </div>

                            {formik.errors.expenseType && formik.touched.expenseType ? <div>{formik.errors.expenseType}</div> : null}
                        </form>
                    </div>
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
    shouldRefresh: PropTypes.bool,
    addExpense: PropTypes.bool,
    linkedActivity: PropTypes.number,
};