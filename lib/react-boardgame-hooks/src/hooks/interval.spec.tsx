import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useInterval from './interval';

describe('useInterval', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useInterval());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
