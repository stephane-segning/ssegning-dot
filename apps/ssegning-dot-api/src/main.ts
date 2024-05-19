import { dotGame } from '@ssegning-dot/ssegning-dot-lib';
import { FlatFile, Origins, Server, SocketIO } from 'boardgame.io/server';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// const db = new PostgresStore({
//   database: "database",
//   username: "username",
//   password: "password",
//   host: "host",
// });

const server = Server({
  // Provide the definitions for your game(s).
  games: [dotGame],

  // Provide the database storage class to use.
  db: new FlatFile({
    dir: './storage/directory',
  }),

  origins: [
    // Allow your game site to connect.
    'https://dot.games.ssegning.me',
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
  transport: new SocketIO({
    socketOpts: {
      path: '/api/socket.io',
    } as any,
  }),
});

server.run(port, () => {
  console.log(`[ server ] http://localhost:${port}/api`);
});
