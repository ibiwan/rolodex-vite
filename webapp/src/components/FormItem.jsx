import { ErrorMessage, Field } from 'formik';

export const FormItem = ({
  id,
  name,
  label,
}) => <>
    <label htmlFor={id}>{label}:</label>
    <Field id={id} name={name} />
    <span style={{ color: 'red' }} >
      <ErrorMessage name={name} />
    </span>
  </>