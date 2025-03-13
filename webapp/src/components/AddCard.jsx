import { Field, Form, Formik } from 'formik';
import { makeCard } from '../services/api.js';
import { ThreeCol } from './ThreeCol.jsx';
import { FormItem } from './FormItem.jsx';

const Types = {
  url: 'url',
  image: 'image',
  text: 'text',
}

const Fields = {
  ...Types,
  name: 'name',
  type: 'type',
  tagString: 'tagString',
}

export const AddCard = ({ refreshNames }) => {
  return <Formik
    initialValues={{
      [Fields.name]: '',
      [Fields.tagString]: '',
      [Fields.type]: 'text',
      [Fields.url]: '',
      [Fields.text]: '',
      [Fields.image]: null,
    }}

    onSubmit={async (data) => {
      const fd = new FormData()

      fd.append(Fields.name, data[Fields.name]);
      fd.append(Fields.tagString, data[Fields.tagString]);

      switch (data[Fields.type]) {
        case Types.url:
          console.log("url")
          fd.append(Fields.url, data[Fields.url]);
          break;
        case Types.image:
          console.log("image")
          fd.append(Fields.image, data[Fields.image]);
          break;
        case Types.text:
          console.log("text")
          fd.append(Fields.text, data[Fields.text]);
          break;
      }

      console.log({ data, keys: fd.keys().toArray() })

      await makeCard(fd);
      refreshNames();
    }}

    validate={values => {
      const errors = {};
      if (values.name === '') {
        errors.name = 'Name must be set';
      }

      console.log({ values })

      switch (values[Fields.type]) {
        case Types.url:
          if (values[Fields.url] === '') {
            errors[Fields.url] = 'URL must be set';
          }
          break;
        case Types.text:
          if (values[Fields.text] === '') {
            errors[Fields.text] = 'Text Block must be provided';
          }
          break;
        case Types.image:
          if (values[Fields.image] === null) {
            errors[Fields.image] = 'An image file must be selected';
          }
          break;
      }
      return errors;
    }}
  >
    {({ setFieldValue, values }) =>
      <Form>
        <ThreeCol>
          <FormItem name={Fields.name} label='Name' />
          <FormItem name={Fields.tagString} label='Tags' />

          <span>Card Type:</span>
          <span>
            <label>
              <Field name={Fields.type} type='radio' value={Types.url} />
              URL
            </label>
            <label>
              <Field name={Fields.type} type='radio' value={Fields.text} />
              Text Block
            </label>
            <label>
              <Field name={Fields.type} type='radio' value={Fields.image} />
              Image
            </label>
          </span>
          <span></span>

          {values.type === Types.url &&
            <FormItem name={Types.url} label='URL' />
          }
          {values.type === Types.text &&
            <FormItem name={Types.text} label='Text Block'
              component='textarea' />
          }
          {values.type === Types.image &&
            <FormItem name={Types.image} label='Image File'
              component={
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.currentTarget.files) {
                      setFieldValue(Fields.image, e.currentTarget.files[0]);
                    }
                  }} />
              }
            />
          }

          <span></span>
          <button type="submit">Add Card</button>
          <span></span>
        </ThreeCol>
      </Form>
    }
  </Formik>
}
