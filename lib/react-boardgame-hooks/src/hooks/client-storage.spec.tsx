import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useClientStorage from './client-storage';

describe('useClientStorage', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useClientStorage());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
