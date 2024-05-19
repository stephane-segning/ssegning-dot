import { useContext } from 'react';
import { context } from '../lib/context';
import { LobbyClient } from 'boardgame.io/client';

export function useLobbyClient(): LobbyClient {
  const { client } = useContext(context);
  return client;
}

export default useLobbyClient;
