import { ErrorMessage, Field } from 'formik';
import { useId } from 'react';

export const FormItem = ({
  name,
  label,
  component = null
}) => {
  const id = 'name' + useId();

  return (<>
    <label htmlFor={id}>{label}:</label>
    <Field id={id} name={name} component={component || 'input'} />
    <span style={{ color: 'red' }} >
      <ErrorMessage name={name} />
    </span>
  </>)
}
