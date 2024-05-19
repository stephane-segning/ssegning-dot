import { withFormik } from 'formik';
import * as yup from 'yup';
import type { FormikProps } from 'formik/dist/types';
import { Button } from './components/button';
import { TextInput } from './components/text-input';
import { AppForm } from './components/form-control';

const schema = yup.object({
  name: yup.string().required(),
});

export interface LoginValue {
  name: string;
}

interface LoginProps {
  onEnter: (value: LoginValue) => void;
  defaultName?: string;
}

function LoginForm(props: LoginProps & FormikProps<LoginValue>) {
  return (
    <AppForm>
      <TextInput label="Your name" placeholder="Enter your name" name="name" />

      <Button type="submit">Submit</Button>
    </AppForm>
  );
}

export const LoginBlock = withFormik<LoginProps, LoginValue>({
  mapPropsToValues: ({ defaultName }) => ({ name: defaultName ?? '' }),
  // Custom sync validation
  validationSchema: schema,
  //
  handleSubmit: (values, { props: { onEnter } }) => {
    onEnter(values);
  },
  //
  displayName: 'LoginBlock',
})(LoginForm);
