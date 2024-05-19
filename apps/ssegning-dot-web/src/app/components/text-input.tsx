import { useField } from 'formik';
import { FieldInput, FieldProps, Input } from './form-control';

type TextInputProps = React.HTMLProps<HTMLInputElement> &
  Omit<FieldProps, 'error' | 'children'> & {
    name: string;
  };

export function TextInput({ label, info, ...rest }: TextInputProps) {
  const [field, meta, helpers] = useField(rest);
  return (
    <FieldInput label={label} error={meta.touched && meta.error} info={info}>
      <Input
        {...field}
        {...rest}
        type="text"
        placeholder="Type here"
        $isError={!!(meta.touched && meta.error)}
      />
    </FieldInput>
  );
}
