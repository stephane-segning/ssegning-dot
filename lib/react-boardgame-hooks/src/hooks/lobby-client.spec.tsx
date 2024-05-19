import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useLobby from './lobby-client';

describe('useLobby', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useLobby());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
