import PropTypes from 'prop-types';
import { useFormik } from 'formik'

export const EditExpense = props => {

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            purchaseDate: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            {
                props.isVisible ? (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <label htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        <label htmlFor="purchaseDate">Purchase Date</label>
                        <input
                            id="purchaseDate"
                            name="purchaseDate"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.purchaseDate}
                        />
                        <div>TODO: Add expense type</div>
                        <button type="submit">Submit</button>
                    </form>
                ) : null
            }
        </div>

    );
}

EditExpense.propTypes = {
    isVisible: PropTypes.bool,
};