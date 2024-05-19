import { LobbyClient } from 'boardgame.io/client';
import React from 'react';
import { GameComponent } from '../components/provider';
import { PlayerState } from '@ssegning-dot/ssegning-dot-lib';
import type { LobbyAPI } from 'boardgame.io/src/types';

export type PlayerCredentialsMatchMapping = Record<
  string,
  { playerID: string; playerCredentials: string }
>;
export type Match = {
  numPlayers: number;
  unlisted: boolean;
  setupData: any;
  gameName: string;
};
export type MatchData = Record<string, Match>;

type SetInfo<T> = (data: (prev: T) => T) => void;

interface ContextState {
  games: GameComponent[];
  client: LobbyClient;
  player: PlayerState;
  setPlayer: SetInfo<PlayerState>;
  credentials: PlayerCredentialsMatchMapping;
  setCredentials: SetInfo<PlayerCredentialsMatchMapping>;
  matches: MatchData;
  setMatches: SetInfo<MatchData>;
  matchesData: Record<string, LobbyAPI.Match>;
}

export const context = React.createContext<ContextState>({
  client: undefined as any,
  player: {} as any,
  credentials: {},
  setPlayer: (_) => undefined,
  setCredentials: (_) => undefined,
  games: [],
  matches: {},
  setMatches: (_) => undefined,
  matchesData: {},
});
