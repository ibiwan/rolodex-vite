import { useId } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { makeCard } from '../services/api.js';
import { ThreeCol } from './ThreeCol.jsx';
import { FormItem } from './FormItem.jsx';

export const AddUrl = ({ refreshNames }) => {
  const nameId = useId();
  const urlId = useId();
  const tagId = useId();

  return <Formik
    initialValues={{
      name: '',
      url: '',
      tagString: '',
    }}

    onSubmit={async (data) => {
      await makeCard(data);
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
        <ThreeCol>
          <FormItem {...{
            id: nameId,
            name: "name",
            label: "Name",
          }} />

          <FormItem {...{
            id: urlId,
            name: "url",
            label: "URL",
          }} />

          <FormItem {...{
            id: tagId,
            name: "tagString",
            label: "Tags",
          }} />

          <span></span>
          <button type="submit">Add URL</button>
          <span></span>
        </ThreeCol>
      </Form>
    }
  </Formik>

}
