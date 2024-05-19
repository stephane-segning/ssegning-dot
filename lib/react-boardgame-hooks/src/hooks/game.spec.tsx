import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useGame from './game';

describe('useGame', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
