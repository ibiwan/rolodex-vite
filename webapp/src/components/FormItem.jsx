import { ErrorMessage, Field } from 'formik';
import { useId } from 'react';

export const FormItem = ({
  name,
  label,
  component = null,
  ...props
}) => {
  const id = 'name' + useId();

  if (component === 'textarea') {
    component = <Field {...props} id={id} name={name}>
      {(field) => <textarea name={name} value={field.value} onChange={
        (evt) => {
          field.field.onChange(evt)
        }
      } />}
    </Field>
  }

  return (<>
    <label htmlFor={id}>{label}:</label>
    {component ||
      <Field id={id} name={name} {...props} />
    }
    <span style={{ color: 'red' }} >
      <ErrorMessage name={name} />
    </span>
  </>)
}
