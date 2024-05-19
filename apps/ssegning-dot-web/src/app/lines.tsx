import tw from 'tailwind-styled-components';
import stc from 'string-to-color';
import styled from 'styled-components';

interface BaseLineProps {
  $isClickable?: boolean;
  playerId?: string;
}

const Base = styled.div<BaseLineProps>`
  ${({ playerId }) =>
    playerId ? `background-color: ` + stc(playerId) : undefined};
`;

const BaseLine = tw(Base)<BaseLineProps>`
transition ease-in-out relative rounded-2xl w-[calc(100%-10px)] h-[calc(100%-10px)]
${({ $isClickable }) =>
  $isClickable ? 'bg-gray-300 cursor-pointer hover:bg-gray-600' : ''}
`;

export const HorizontalLine = tw(BaseLine)`h-2`;
export const VerticalLine = tw(BaseLine)`w-2`;
