import type { LobbyAPI } from 'boardgame.io';
import { Button } from './components/button';
import { useMemo } from 'react';
import { usePlayer } from '@ssegning-dot/lib/react-boardgame-hooks';
import { Clipboard, FastForward, LogOut } from 'react-feather';

interface MatchInstanceProps {
  match: LobbyAPI.Match;
  onClickJoin: (idx: number) => void;
  onClickStart: () => void;
  onClickLeave: () => void;
}

export function MatchInstance({
  onClickJoin,
  onClickStart,
  onClickLeave,
  match: { players, gameName, matchID },
}: MatchInstanceProps) {
  const {
    player: { name: playerName },
  } = usePlayer();

  const freeSeatId = useMemo(() => {
    const freeSeat = players.find(({ name }) => !name);
    return freeSeat?.id;
  }, [players]);

  const playerSeatId = useMemo(() => {
    const playerSeat = players.find((player) => player.name === playerName);
    return playerSeat?.id;
  }, [playerName, players]);

  const status = useMemo(() => {
    if (playerSeatId !== undefined && freeSeatId !== undefined) {
      return 'waiting';
    }
    if (freeSeatId !== undefined) return 'can-join';
    if (playerSeatId !== undefined) return 'game-full';
    return 'can-watch';
  }, [freeSeatId, playerSeatId]);

  return (
    <div className="rounded border border-xl bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{matchID}</h2>
        <p>{gameName}</p>
        <div className="card-actions justify-end">
          {status === 'waiting' && (
            <Button
              $size="sm"
              $shape="circle"
              $color="ghost"
              onClick={() => onClickLeave()}
            >
              <LogOut className="h-6 w-6" />
            </Button>
          )}

          {status === 'can-join' && (
            <Button
              $size="sm"
              $shape="circle"
              $color="ghost"
              onClick={() => onClickJoin(freeSeatId!)}
            >
              <Clipboard className="h-6 w-6" />
            </Button>
          )}

          {status === 'game-full' && (
            <>
              <Button
                $size="sm"
                $shape="circle"
                $color="ghost"
                onClick={() => onClickStart()}
              >
                <FastForward className="h-6 w-6" />
              </Button>
              <Button $size="sm" $shape="circle" $color="ghost">
                <Clipboard className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
