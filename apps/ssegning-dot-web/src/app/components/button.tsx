import tw from 'tailwind-styled-components';

const buttonColor = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  error: 'btn-error',
};

const buttonShape = {
  circle: 'btn-circle',
  square: 'btn-square',
};

const buttonSize = {
  sm: 'btn-sm',
  md: 'btn-md',
};

interface ButtonProps {
  $color?: keyof typeof buttonColor;
  $shape?: keyof typeof buttonShape;
  $size?: keyof typeof buttonSize;
}

export const Button = tw.button<ButtonProps>`
btn
${({ $color = 'primary' }) => buttonColor[$color]}
${({ $shape }) => ($shape ? buttonShape[$shape] : '')}
${({ $size }) => ($size ? buttonSize[$size] : '')}
`;
