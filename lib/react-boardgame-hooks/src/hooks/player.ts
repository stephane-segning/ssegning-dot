import { context } from '../lib/context';
import { useContext } from 'react';

export function usePlayer() {
  const { player, setPlayer } = useContext(context);
  return { player, setPlayer };
}
