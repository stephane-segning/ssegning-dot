import { withFormik } from 'formik';
import * as yup from 'yup';
import type { FormikProps } from 'formik/dist/types';
import { Button } from './components/button';
import { TextInput } from './components/text-input';
import { AppForm } from './components/form-control';

const schema = yup.object({
  code: yup.string().required(),
});

export interface CodeValue {
  code: string;
}

interface CodeProps {
  onCode: (value: CodeValue) => void;
}

function CodeForm(props: CodeProps & FormikProps<CodeValue>) {
  return (
    <AppForm>
      <TextInput label="Your name" placeholder="Enter your name" name="code" />

      <Button type="submit">Submit</Button>
    </AppForm>
  );
}

export const CodeBlock = withFormik<CodeProps, CodeValue>({
  mapPropsToValues: () => ({ code: '' }),
  // Custom sync validation
  validationSchema: schema,
  //
  handleSubmit: (values, { props: { onCode } }) => {
    onCode(values);
  },
  //
  displayName: 'CodeBlock',
})(CodeForm);
