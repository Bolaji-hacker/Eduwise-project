import { useField } from "formik";
import CustomInput from "./CustomInput";

const FormikCustomInput = ({ label, type = "text", placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const { error, touched } = meta;
    const { name } = field;

    return (
        <CustomInput
            label={label}
            name={name}
            type={type}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={error}
            touched={touched}
            {...props}
        />
    );
};

export default FormikCustomInput;
