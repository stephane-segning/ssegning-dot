import { useContext } from 'react';
import { context } from '../lib/context';

export function useGame() {
  const { games } = useContext(context);
  return games;
}

export default useGame;
