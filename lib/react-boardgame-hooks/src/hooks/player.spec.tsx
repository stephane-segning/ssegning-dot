import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePlayer from './player';

describe('usePlayer', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePlayer());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
