import type { Game, Move, PlayerID } from 'boardgame.io';
import type { Dot } from './dot';
import { DotGameSettings } from './dot-game.settings';
import { INVALID_MOVE } from 'boardgame.io/core';
import * as _ from 'lodash';
import stc from 'string-to-color';
import { PluginPlayer } from 'boardgame.io/plugins';

export interface GameState {
  grid: string[][];
}

export interface PlayerState {
  color: string;
  name: string;
}

// define a function to initialize each player’s state
const playerSetup = (playerID: string): PlayerState => ({
  color: stc(playerID),
  name: playerID,
});

// filter data returned to each client to hide secret state (OPTIONAL)
const playerView = (
  players: Record<PlayerID, PlayerState>,
  playerID?: string | null
) => {
  if (!playerID) {
    return null;
  }

  return {
    [playerID]: players[playerID],
  };
};

const clickDot: Move<GameState> = ({ G, playerID }, { row, col }: Dot) => {
  if (row > G.grid.length || row < 0 || col > G.grid[0].length || col < 0)
    return INVALID_MOVE;
  if (G.grid[row][col]) return INVALID_MOVE;
  G.grid[row][col] = playerID;
  return;
};

export const dotGame: Game<
  GameState,
  Record<string, unknown>,
  DotGameSettings
> = {
  name: 'dot-game',

  disableUndo: true,

  setup: (_, setupData) => {
    const rows = setupData?.maxRow ?? 5;
    const cols = setupData?.maxCol ?? 4;
    return {
      grid: Array.from({ length: rows * 2 + 1 }, () =>
        Array(cols * 2 + 1).fill(undefined)
      ),
    };
  },

  // validateSetupData: (setupData, numPlayers) => {
  //   if (!setupData) return 'requires setup data';
  //   if (!numPlayers) return 'requires number of players';
  //   return;
  // },

  moves: {
    clickDot: {
      move: clickDot,
      undoable: false,
      client: false,
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: ({ G, ctx }) => {
    const grid = G.grid;
    const pointCount: Record<string, number> = {};
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[i].length; j += 1) {
        const element = grid[i][j];
        if (
          ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) &&
          !element
        ) {
          return;
        }
        if (i % 2 === 0 && j % 2 === 0) {
          pointCount[element]++;
        }
      }
    }

    if (ctx.numPlayers !== Object.keys(pointCount).length) {
      return {
        invalidGame: true,
      };
    }

    const winner = _.sortBy(Object.entries(pointCount), ([, c]) => c);
    return {
      winner: winner[0],
    };
  },

  events: {
    endTurn: true,
  },
  plugins: [
    // pass your function to the player plugin
    PluginPlayer({
      setup: playerSetup,
      playerView: playerView,
    }),
  ],

  maxPlayers: 6,
  minPlayers: 2,
};
