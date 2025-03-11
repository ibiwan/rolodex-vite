import { useId, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { makeCard } from '../services/api.js';
import { ThreeCol } from './ThreeCol.jsx';
import { FormItem } from './FormItem.jsx';

export const AddImage = ({ refreshNames }) => {
  const nameId = useId();
  const tagId = useId();
  const blobId = useId();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          file: null,
          tagString: '',
        }}

        onSubmit={async (data) => {
          console.log({ data, file: data.file })

          // const fr = new FileReader();
          // fr.onload = (...a) => { console.log({ a }) }
          // fr.readAsArrayBuffer(data.file);

          const fd = new FormData();

          fd.append('name', data.name);
          fd.append('image', data.file);
          fd.append('tagString', data.tagString);

          await makeCard(fd);

          refreshNames();
        }}

        validate={values => {
          const errors = {};
          if (values.name === '') { errors.name = 'Name must be set' }
          if (values.file === null) { errors.file = 'A file must be selected' }
          return errors;
        }}
      >
        {({ setFieldValue }) => <Form>
          <ThreeCol>
            <FormItem {...{
              id: nameId,
              name: 'name',
              label: 'Name',
            }} />

            <label htmlFor={blobId}>Image File:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.currentTarget.files) {
                  console.log({ files: e.currentTarget.files })
                  setFieldValue("file", e.currentTarget.files[0]);
                }
              }} />
            <span style={{ color: 'red' }} >
              <ErrorMessage name='file' />
            </span>

            <FormItem {...{
              id: tagId,
              name: "tagString",
              label: "Tags",
            }} />

            <span></span>
            <button type="submit">Add Image</button>
            <span></span>
          </ThreeCol>
        </Form>}
      </Formik>
    </>)
}
