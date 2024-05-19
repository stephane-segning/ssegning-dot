import { useClientStorage, useGame, useMatch, usePlayer } from '@ssegning-dot/lib/react-boardgame-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { LoginBlock, LoginValue } from './login-form';
import { CreateMatchBlock, CreateMatchValue } from './create-match-form';
import { Title } from './components/title';
import { Button } from './components/button';
import stc from 'string-to-color';
import { DotGameSettings } from '@ssegning-dot/ssegning-dot-lib';
import { MatchInstance } from './match-instance';
import { DotGameComponent } from './game-playground';
import { CodeBlock } from './code-form';

type Phase = 'enter' | 'menu' | 'play' | 'waiting';

export function DotLobbyClient() {
  const games = useGame();
  const {
    player: { name: playerName },
    setPlayer
  } = usePlayer();
  const {
    matches,
    createMatch,
    matchesData,
    joinMatch,
    joinByCode,
    updatePlayerMatch,
    playAgainMatch,
    leaveMatch,
    credentials
  } = useMatch();
  const { set, get } = useClientStorage();
  const [phase, setPhase] = useState<Phase>(() => {
    const prev = get<Phase>('game--phase');
    if (prev) return prev;
    return 'enter';
  });

  const [currentMatch, setCurrentMatch] = useState<string>();

  useEffect(() => {
    set('game--phase', phase);
  }, [phase, set]);

  const onEnter = useCallback(
    async ({ name }: LoginValue) => {
      setPlayer(() => ({
        name,
        color: stc(name)
      }));
      setPhase((prevState) => 'menu');
    },
    [setPlayer]
  );

  const onCreateMatch = useCallback(
    async ({ selectedGameId, numPlayers }: CreateMatchValue) => {
      await createMatch<DotGameSettings>({
        gameName: selectedGameId,
        numPlayers,
        setupData: {
          maxRow: 4,
          maxCol: 8
        }
      });
      setPhase('waiting');
    },
    [createMatch]
  );

  const onHandleExitLobby = useCallback(() => {
    setPhase('enter');
  }, []);

  const startGame = useCallback((matchID: string) => {
    setCurrentMatch(matchID);
    setPhase('play');
  }, []);

  return (
    <div className="rounded bg-base-100 p-2 md:p-4 lg:md-6 min-w-[400px] max-w-lg">
      <Title>
        Welcome <i>{playerName}</i>!
      </Title>
      <p className="my-4">
        Welcome to <u>SSegning Game</u>
      </p>

      <div className="divider" />

      {phase === 'enter' && (
        <div>
          <LoginBlock defaultName={playerName} onEnter={onEnter} />
        </div>
      )}

      {phase === 'menu' && (
        <div>
          <h4 className="mb-2">Create a game</h4>
          <CreateMatchBlock createMatch={onCreateMatch} games={games} />
          <div className="divider">or</div>
          <h4 className="mb-2">Enter a code</h4>
          <CodeBlock
            onCode={({ code }) =>
              joinByCode({
                matchID: code,
                gameName: ''
              })
            }
          />
        </div>
      )}

      {phase === 'play' && currentMatch && (
        <div>
          <h4 className="mb-2">Now win!</h4>
          <DotGameComponent
            credentials={credentials[currentMatch].playerCredentials}
            numPlayers={matches[currentMatch].numPlayers}
            matchID={currentMatch}
            playerID={credentials[currentMatch].playerID}
          />
        </div>
      )}

      {phase === 'waiting' && (
        <div>
          <h4 className="mb-2">Waiting for other players</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(matches)
              .filter((i) => !!matchesData[i])
              .map((k) => (
                <MatchInstance
                  key={k}
                  onClickJoin={(idx) =>
                    joinMatch({
                      matchID: k,
                      playerID: idx + ''
                    })
                  }
                  match={matchesData[k]}
                  onClickLeave={() =>
                    leaveMatch({
                      matchID: k
                    })
                  }
                  onClickStart={() => startGame(k)}
                />
              ))}
          </div>
        </div>
      )}

      <div className="divider" />

      <div className="w-full">
        <Button onClick={onHandleExitLobby} $color="error">
          Exit lobby
        </Button>
      </div>
    </div>
  );
}
