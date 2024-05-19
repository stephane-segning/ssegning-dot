import { useField } from 'formik';
import { FieldInput, FieldProps, Select } from './form-control';

type SelectInputProps = React.HTMLProps<HTMLSelectElement> &
  Omit<FieldProps, 'error' | 'children'> & {
    name: string;
    info?: string;
  };

export function SelectInput({ label, info, ...rest }: SelectInputProps) {
  const [field, meta, helpers] = useField(rest);
  return (
    <FieldInput label={label} error={meta.touched && meta.error} info={info}>
      <Select {...field} {...rest} $isError={!!(meta.touched && meta.error)} />
    </FieldInput>
  );
}
