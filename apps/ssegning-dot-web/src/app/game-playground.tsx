import { SocketIO } from 'boardgame.io/multiplayer';
import { DotBoard } from './board';
import { Client } from 'boardgame.io/react';
import { useMemo } from 'react';
import { Loading } from './loading';
import { dotGame } from '@ssegning-dot/ssegning-dot-lib';

const activateDebug = import.meta.env.DEV;

interface DotGameComponentProps {
  numPlayers: number;
  playerID: string;
  matchID: string;
  credentials: string;
}

export const DotGameComponent = ({
  numPlayers,
  playerID,
  matchID,
  credentials,
}: DotGameComponentProps) => {
  const DotGameClient = useMemo(
    () =>
      Client({
        game: dotGame,
        multiplayer: SocketIO(),
        board: DotBoard,
        loading: Loading,
        debug: activateDebug,
        numPlayers: numPlayers,
      }),
    [numPlayers]
  );

  return (
    <div id="playground">
      <DotGameClient
        debug={activateDebug}
        playerID={playerID}
        matchID={matchID}
        credentials={credentials}
      />
    </div>
  );
};
