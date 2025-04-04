import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../common/CustomButton';
import { useGlobalContext } from '../../context/ContextExport';


const AddAdminForm = ({ close }) => {
    const { AddAdminFunc, addingAdmin } = useGlobalContext()
    const initialValues = {
        name: '',
        email: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        // Handle form submission here
        const successFunc = () => {
            close()
            resetForm();
        }
        AddAdminFunc(values, successFunc)
    };

    return (
        <div className="">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 mb-2">
                            Name
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div className='' >
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-2">
                            Email
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div className="mt-6">

                        <CustomButton
                            showAnimation={addingAdmin}
                            type="submit"
                            style="w-full bg-primary_b text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            Add Admin
                        </CustomButton>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddAdminForm;