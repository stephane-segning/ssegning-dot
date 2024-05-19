// Board.tsx
import type { BoardProps } from 'boardgame.io/react';
import type { GameState, Line } from '@ssegning-dot/ssegning-dot-lib';
import React, { useCallback } from 'react';
import { Chocked, ChockedPlaceholder, Dot, DotGrid } from './components/box';
import { HorizontalLine, VerticalLine } from './lines';

interface GameProps extends BoardProps<GameState> {}

export function DotBoard({ G, moves, playerID, matchData }: GameProps) {
  const onLineClick = useCallback(
    (dot: Line) => {
      moves.clickDot(dot);
    },
    [moves]
  );

  const grid = G.grid;

  return (
    <div>
      <DotGrid rows={grid.length} cols={grid[0].length}>
        {grid.map((_, row) => (
          <React.Fragment key={row}>
            {grid[row].map((playerId, col) => (
              <React.Fragment key={col}>
                {row % 2 === 0 && col % 2 === 0 && (
                  <Dot key={`dot-${row}-${col}`} />
                )}

                {row % 2 !== 0 && col % 2 !== 0 && (
                  <>
                    {true && <ChockedPlaceholder key={`c-${row}-${col}`} />}
                    {false && <Chocked key={`c-${row}-${col}`} />}
                  </>
                )}

                {row % 2 === 0 && col % 2 !== 0 && (
                  <HorizontalLine
                    playerId={playerId}
                    $isClickable={!grid[row][col]}
                    key={`h-${row}-${col}`}
                    onClick={() => !grid[row][col] && onLineClick({ col, row })}
                  />
                )}

                {row % 2 !== 0 && col % 2 === 0 && (
                  <VerticalLine
                    playerId={playerId}
                    $isClickable={!grid[row][col]}
                    key={`v-${row}-${col}`}
                    onClick={() => !grid[row][col] && onLineClick({ col, row })}
                  />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </DotGrid>

      <p>{`Player ${playerID}'s turn`}</p>
    </div>
  );
}
