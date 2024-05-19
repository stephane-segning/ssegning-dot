import tw from 'tailwind-styled-components';
import { Field, Form } from 'formik';

export const Label = tw.div`label`;

export const FormControl = tw.label`form-control w-full`;

const labelSpanPosition = {
  left: 'label-text',
  right: 'label-text-alt',
};

interface LabelSpanProps {
  position?: keyof typeof labelSpanPosition;
}

export const LabelSpan = tw.span<LabelSpanProps>`
animate-pulse opacity-70 hover:opacity-100
${({ position = 'left' }) => labelSpanPosition[position]}
`;

interface InputProps {
  $isError?: boolean;
}

export const Input = tw.input<InputProps>`
input input-bordered w-full
${({ $isError }) => $isError && `input-error`}
`;

export const Select = tw.select<InputProps>`
select select-bordered w-full
${({ $isError }) => $isError && `select-error`}
`;

interface RadioFieldProps extends InputProps {
  type: 'radio';
  name: string;
  value: unknown;
}

const RadioField = tw(Field)<RadioFieldProps>`
radio radio-primary
${({ $isError }) => $isError && `radio-error`}
`;

interface RadioProps<T> {
  value: T;
  name: string;
  label: any;
}

export function Radio<T>({ value, name, label }: RadioProps<T>) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <LabelSpan>{label}</LabelSpan>
        <RadioField type="radio" name={name} value={value} />
      </label>
    </div>
  );
}

export const AppForm = tw(Form)`flex flex-col gap-4 mg:gap-6`;

export type FieldProps = {
  label: string;
  info?: string;
  error?: false | string;
  children: React.ReactNode | React.ReactNode[];
};

export function FieldInput({ label, info, error, children }: FieldProps) {
  return (
    <FormControl>
      {(label || info) && (
        <Label>
          {label && <LabelSpan>{label}</LabelSpan>}
          {info && <LabelSpan position="right">{info}</LabelSpan>}
        </Label>
      )}

      <div>{children}</div>

      {error ? (
        <Label>
          <LabelSpan className="text-error">{error}</LabelSpan>
        </Label>
      ) : null}
    </FormControl>
  );
}
