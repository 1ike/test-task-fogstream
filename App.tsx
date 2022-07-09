import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { beforeRender, afterRender } from './src/bootstrap';
import List from './src/screens/List';
import store from './src/state/store';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await beforeRender();

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await afterRender();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1 }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onLayout={onLayoutRootView}
    >
      <Provider store={store}>
        <List />
      </Provider>
    </View>
  );
}
