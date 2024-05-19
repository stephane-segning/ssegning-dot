import { render } from '@testing-library/react';

import LibReactBoardgameHooks from './context';

describe('LibReactBoardgameHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibReactBoardgameHooks />);
    expect(baseElement).toBeTruthy();
  });
});
