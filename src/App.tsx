import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles/index.sass';
import { Notifications } from '@mantine/notifications';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { ScreenSizeProvider } from '@/providers';
import { Routes } from '@/routing';
import { cssVariablesResolver, theme } from '@/styles/theme';
import { handleError } from '@/helpers';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => handleError(e),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
      <ModalsProvider>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <ScreenSizeProvider>
            <Routes />
          </ScreenSizeProvider>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
