import { ErrorMessage, Field } from 'formik';
import { useId } from 'react';

export const FormItem = ({
  name,
  label,
  component=null
}) => {
  const id = 'name' + useId();

  return (<>
    <label htmlFor={id}>{label}:</label>
    {component || 
      <Field id={id} name={name} />
    }
    <span style={{ color: 'red' }} >
      <ErrorMessage name={name} />
    </span>
  </>)
}
