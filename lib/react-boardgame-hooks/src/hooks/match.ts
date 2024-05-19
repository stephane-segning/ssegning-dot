import { useCallback, useContext } from 'react';
import { context } from '../lib/context';
import * as _ from 'lodash';

interface CreateMatch<SetupData> {
  gameName: string;
  numPlayers?: number;
  setupData?: SetupData;
  unlisted?: boolean;
  extraBody?: {
    [key: string]: any;
  };
}

interface LeaveMatch {
  matchID: string;
  extraBody?: {
    [key: string]: any;
  };
}

interface JoinMatch {
  matchID: string;
  gameName?: string;
  playerID: string;
  extraBody?: {
    [key: string]: any;
  };
}

interface PlayAgainMatch {
  matchID: string;
  extraBody?: {
    [key: string]: any;
  };
}

interface UpdatePlayerMatch {
  matchID: string;
  newName?: string;
  extraBody?: {
    [key: string]: any;
  };
}

interface JoinByCode {
  gameName: string;
  matchID: string;
}

export function useMatch() {
  const {
    client,
    matches,
    matchesData,
    setMatches,
    setCredentials,
    player,
    credentials
  } = useContext(context);

  const joinMatch = useCallback(
    async ({
             matchID,
             extraBody = {},
             gameName = matches[matchID].gameName,
             playerID: pid
           }: JoinMatch) => {
      const { playerID, playerCredentials } = await client.joinMatch(
        gameName,
        matchID,
        {
          playerID: pid,
          playerName: player.name,
          data: {},
          ...extraBody
        }
      );

      setCredentials((prev) => ({
        ...prev,
        [matchID]: { playerCredentials, playerID }
      }));
    },
    [client, matches, player.name, setCredentials]
  );

  const joinByCode = useCallback(
    async ({ matchID, gameName }: JoinByCode) => {
      const { players, unlisted, setupData } = await client.getMatch(
        gameName,
        matchID
      );
      const nextFreePlace = _.findIndex(players, (n) => !n.name);
      if (nextFreePlace < 0) throw Error('Game is full');

      setMatches((prev) => ({
        ...prev,
        [matchID]: {
          numPlayers: players.length,
          unlisted: unlisted ?? false,
          setupData,
          gameName
        }
      }));

      await joinMatch({
        matchID,
        gameName,
        playerID: nextFreePlace + ''
      });
    },
    [client, joinMatch, setMatches]
  );

  const createMatch = useCallback(
    async <SetupData>({
                        gameName,
                        extraBody = {},
                        unlisted = true,
                        numPlayers = 2,
                        setupData
                      }: CreateMatch<SetupData>) => {
      const { matchID } = await client.createMatch(gameName, {
        setupData,
        numPlayers,
        unlisted,
        ...extraBody
      });

      setMatches((prev) => ({
        ...prev,
        [matchID]: { numPlayers, unlisted, setupData, gameName }
      }));
      await joinMatch({ matchID, gameName, playerID: '0' });
    },
    [client, joinMatch, setMatches]
  );

  const leaveMatch = useCallback(
    async ({ matchID, extraBody = {} }: LeaveMatch) => {
      await client.leaveMatch(matches[matchID].gameName, matchID, {
        playerID: credentials[matchID].playerID,
        credentials: credentials[matchID].playerCredentials,
        ...extraBody
      });

      setMatches(({ matchID, ...rest }) => rest);
    },
    [client, credentials, matches, setMatches]
  );

  const playAgainMatch = useCallback(
    async ({ matchID, extraBody = {} }: PlayAgainMatch) => {
      await client.playAgain(matches[matchID].gameName, matchID, {
        playerID: credentials[matchID].playerID,
        credentials: credentials[matchID].playerCredentials,
        ...extraBody
      });
    },
    [client, credentials, matches]
  );

  const updatePlayerMatch = useCallback(
    async ({ matchID, extraBody = {}, newName }: UpdatePlayerMatch) => {
      await client.updatePlayer(matches[matchID].gameName, matchID, {
        playerID: credentials[matchID].playerID,
        credentials: credentials[matchID].playerCredentials,
        newName,
        data: {},
        ...extraBody
      });
    },
    [client, credentials, matches]
  );

  return {
    credentials,
    matchesData,
    matches,
    createMatch,
    leaveMatch,
    playAgainMatch,
    joinMatch,
    updatePlayerMatch,
    joinByCode
  };
}

export default useMatch;
