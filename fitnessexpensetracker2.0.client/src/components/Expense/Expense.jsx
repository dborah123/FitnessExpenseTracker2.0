import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { ExpenseTypes, ConvertDate } from './ExpenseLib';
import axios from 'axios';
import './styles/expense.css';
import { FaCheck } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { IconContext } from "react-icons";
import { useState } from 'react';

export const Expense = (props) => {
    /**
     * STATE AND HELPER FUNCTIONS
     */
    const [isEditable, setIsEditable] = useState(props.addExpense == true);

    const toggleIsEditable = () => {
        setIsEditable(!isEditable);
    }

    const toggleFromCancel = () => {
        if (props.addExpense) {
            props.toggleExpenseVisability();
        } else {
            toggleIsEditable();
        }
    }

    const generateExpenseTypeOptions = () => {
        const options = [];
        for (let [key, value] of Object.entries(ExpenseTypes)) {
            options.push(
                <option key={key} value={value}>
                    {key}
                </option>
            );
        }

        return options;
    }

    const getLinkedActivityId = () => {
        if (props.addExpense) {
            return props.linkedActivity;
        } else {
            return expense.linkedActivity;
        }
    }

    const getInitialFormValues = () => {
        if (props.addExpense) {
            return {
                name: '',
                amount: '',
                purchaseDate: '',
                expenseType: '',
            }
        } else {
            return {
                name: expense.name,
                amount: '' + expense.amount,
                purchaseDate: ConvertDate(expense.purchaseDate),
                expenseType: expense.expenseType,
            }
        }
    }

    const validateForm = (values) => {
        const errors = {};

        if (values.expenseType === "") {
            errors.expenseType = "Expense type is required";
        }

        return errors;
    }

    /**
     * LOGIC
     */
    const expense = props.expense;
    const linkedActivityId = getLinkedActivityId();
    const initialValues = getInitialFormValues();
    const expenseTypeOptions = generateExpenseTypeOptions();


    /**
     * FORMIK
     */
    const formik = useFormik({
        initialValues: initialValues,
        validateForm,
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

            toggleIsEditable();
        },
    });



    return (
        <div>
            {
                props.isVisible ? (
                    <div className="expense">
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
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
                                    disabled={!isEditable}
                                    className="form__field"
                                >
                                    {expenseTypeOptions}
                                </select>
                            </div>

                            {isEditable ? 
                                <div>
                                    <div className="flex-item">
                                        <button className="btn cancel-btn btn-flex-container" onClick={toggleFromCancel}>
                                            <div className="btn-flex-item">
                                                <IconContext.Provider value={{ size: '22px' }}>
                                                    <div>
                                                        <GiCancel />
                                                    </div>
                                                </IconContext.Provider>
                                            </div>
                                            <div className="btn-flex-item">
                                                Cancel
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex-item">
                                        <button className="btn submit-btn btn-flex-container" type="submit">
                                            <div className="btn-flex-item">
                                                <IconContext.Provider value={{ size: '20px' }}>
                                                    <div>
                                                        <FaCheck />
                                                    </div>
                                                </IconContext.Provider>
                                            </div>
                                            <div className="btn-flex-item">
                                                Submit
                                            </div>
                                        </button>
                                    </div>

                                </div>

                                :
                                <div className="flex-item">
                                    <button className="btn edit-btn btn-flex-container" onClick={toggleIsEditable}>
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
                                </div>
                                }

                            {formik.errors.expenseType && formik.touched.expenseType ? <div>{formik.errors.expenseType}</div> : null}
                        </form>
                    </div>
                ) : null
            }
        </div>

    );
}



Expense.propTypes = {
    isVisible: PropTypes.bool,
    expense: PropTypes.object,
    addExpense: PropTypes.bool,
    linkedActivity: PropTypes.number,
    toggleExpenseVisability: PropTypes.func,
};