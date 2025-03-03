import { useField } from "formik";

// Normal Checkbox component
const Checkbox = ({
    id,
    name,
    // checked = false,
    onChange,
    label,
    disabled = false,
    ...props
}) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="checkbox"
                // checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded`}
                {...props}
            />
            <label
                htmlFor={id}
                className={`ml-3 text-sm font-medium text-gray-600 ${
                    disabled ? "opacity-50" : ""
                }`}
            >
                {label}
            </label>
        </div>
    );
};

// Formik Checkbox component
const FormikCheckbox = ({ id, name, label, disabled = false, ...props }) => {
    const [field, meta] = useField(name);

    return (
        <>
            <Checkbox
                id={id}
                name={name}
                // checked={field.value}
                onChange={field.onChange}
                label={label}
                disabled={disabled}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export { Checkbox, FormikCheckbox };

// use case
//   const [isChecked, setIsChecked] = useState(false);

//   const handleChange = (e) => {
//       setIsChecked(e.target.checked);
//   };

//  <form>
//      <Checkbox
//          id="my-checkbox"
//          name="my-checkbox"
//          checked={isChecked}
//          onChange={handleChange}
//          label="I agree to the terms and conditions"
//      />
//  </form>;
// formik checkbox
//  <FormikCheckbox
//      name="myCheckbox"
//      label="I agree to the terms and conditions"
//  />;
