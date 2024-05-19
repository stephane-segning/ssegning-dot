import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { gridTemplateGen } from '../grid-template-gen';

export const Dot = tw.div`w-5 h-5 bg-gray-700 rounded-full z-10`;
export const Chocked = tw.div`w-10 h-10 bg-black rounded-full`;
export const ChockedPlaceholder = tw.div`w-5 h-5 rounded-full`;

interface DotGridWrapperProps {
  rows: number;
  cols: number;
}

const DotGridWrapper = styled.div<DotGridWrapperProps>`
  grid-template-columns: ${({ cols }) => gridTemplateGen(cols)};
  grid-template-rows: ${({ rows }) => gridTemplateGen(rows)};
`;

export const DotGrid = tw(
  DotGridWrapper
)<DotGridWrapperProps>`grid gap-0 place-items-center`;
