import React, {
  type ComponentType,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LobbyClient } from 'boardgame.io/client';
import {
  context,
  MatchData,
  PlayerCredentialsMatchMapping,
} from '../lib/context';
import { Game } from 'boardgame.io';
import { useClientStorage } from '../hooks/client-storage';
import { PlayerState } from '@ssegning-dot/ssegning-dot-lib';
import stc from 'string-to-color';
import type { LobbyAPI } from 'boardgame.io/src/types';
import { useInterval } from '../hooks/interval';

export interface GameComponent {
  game: Game;
  board: ComponentType<any>;
}

export interface ProviderProps {
  games: GameComponent[];
}

export function Provider({
  children,
  games,
}: PropsWithChildren<ProviderProps>) {
  const { set, get } = useClientStorage();
  const client = useMemo<LobbyClient>(
    () => new LobbyClient({ server: '/' }),
    []
  );
  const [player, setPlayer] = useState<PlayerState>(() => {
    const prevState = get<PlayerState>('game--player');
    if (prevState) {
      return prevState;
    }

    const name = 'Visitor';
    return {
      name,
      color: stc(name),
    };
  });
  const [credentials, setCredentials] = useState<PlayerCredentialsMatchMapping>(
    () => {
      const prevState = get<PlayerState>('game--player-credentials');
      if (prevState) {
        return prevState;
      }
      return {};
    }
  );
  const [matches, setMatches] = useState<MatchData>(() => {
    const prevState = get<PlayerState>('game--matches');
    if (prevState) {
      return prevState;
    }
    return {};
  });
  const [matchesData, setMatchesData] = useState<
    Record<string, LobbyAPI.Match>
  >({});

  const loadMatchData = () => {
    for (const key in matchesData) {
      if (!(key in matches)) {
        setMatchesData(({key, ...rest}) => rest);
      }
    }

    Object.entries(matches)
      .map(([matchID, { gameName }]) =>
      client
        .getMatch(gameName, matchID)
        .then((data) =>
          setMatchesData((prev) => ({
            ...prev,
            [data.matchID]: data,
          }))
        )
        .catch((reason) => {
          console.error(reason);
        })
    );
  };

  useInterval(loadMatchData, 2_000);

  useEffect(() => {
    set('game--player', player);
  }, [player, set]);

  useEffect(() => {
    set('game--player-credentials', credentials);
  }, [credentials, set]);

  useEffect(() => {
    set('game--matches', matches);
  }, [matches, set]);

  return (
    <context.Provider
      value={{
        client,
        player,
        credentials,
        games,
        matches,
        setPlayer,
        setCredentials,
        setMatches,
        matchesData,
      }}
    >
      {children}
    </context.Provider>
  );
}
