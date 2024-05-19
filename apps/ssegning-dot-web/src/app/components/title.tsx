import React from 'react';
import tw from 'tailwind-styled-components';

const TitleBlock = tw.span`bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500`;

type TitleProps = React.HTMLProps<HTMLTitleElement>;

export function Title(props: TitleProps) {
  return (
    <div className="text-5xl font-extrabold ...">
      <TitleBlock {...props} />
    </div>
  );
}
