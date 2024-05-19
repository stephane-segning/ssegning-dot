import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useMatch from './match';

describe('useMatch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useMatch());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
