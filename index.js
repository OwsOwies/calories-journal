/** @format */
import { Navigation } from 'react-native-navigation';
import KaloriePITApp from './src';
import { name as appName } from './app.json';
import registerViews from './src/app/navigation';

registerViews();

Navigation.registerComponent(appName, () => KaloriePITApp);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: appName
      }
    }
  });
});
