import { useId } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { makeCard } from '../services/api';

export const AddUrl = ({ refreshNames }) => {
  const nameId = useId();
  const urlId = useId();
  const tagId = useId();

  return <Formik
    initialValues={{ name: '', url: '', tagString: '' }}
    onSubmit={async (data) => {
      console.log({ data });
      const result = await makeCard(data);
      console.log({ result });
      refreshNames();
    }}
    validate={values => {
      const errors = {};
      if (values.name === '') { errors.name = 'Name must be set' }
      if (values.url === '') { errors.url = 'URL must be set' }
      return errors;
    }}
  >
    {() =>
      <Form>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto'
        }}>
          <label htmlFor={nameId}>Name:</label>
          <Field id={nameId} name="name" />
          <span style={{ color: 'red' }} >
            <ErrorMessage name='name' />
          </span>

          <label htmlFor={urlId}>URL:</label>
          <Field id={urlId} name="url" />
          <span style={{ color: 'red' }} >
            <ErrorMessage name='url' />
          </span>

          <label htmlFor={tagId}>Tags:</label>
          <Field id={tagId} name="tagString" />
          <span />

          <span />
          <button type="submit">Add URL</button>
          <span />
        </div>

      </Form>
    }
  </Formik>

}
