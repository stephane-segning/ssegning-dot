import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './main.scss';

import App from './app/app';
import { ErrorBoundary } from 'react-error-boundary';
import { dotGame } from '@ssegning-dot/ssegning-dot-lib';
import { DotBoard } from './app/board';
import { Provider } from '@ssegning-dot/lib/react-boardgame-hooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider games={[{ game: dotGame, board: DotBoard }]}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
