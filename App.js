import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


// Screens7
import LoginScreen from './src/screens/VentaLogin';
import MenuPrincicpal from './src/screens/MenuPrincicpal';
import BusquedaDePlacas from './src/screens/BusquedaDePlacas';
import BusquedaDeCiudadano from './src/screens/BusquedaDeCiudadano';
import CargosPadron from './src/screens/CargosPadron';
import Infracciones from './src/screens/Infracciones';

import { store, persistor } from './src/store';
import { navigationRef } from './src/utils/navigation';
import { clearNotificationAction } from './src/store/actions/app';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const HomeNavigation = () => (
  <Stack.Navigator headerMode="none">
    
  </Stack.Navigator>
);

const AppNavigation = () => {
  // Refs
  const dropdownalert = useRef();

  // Hooks
  const notification = useSelector((state) => state.app?.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification && notification.message) {
      dropdownalert.current.alertWithType(
        notification.type,
        notification.title || 'Error',
        notification.message,
      );
    }
  }, [notification]);

  const clearNotification = () => {
    dispatch(clearNotificationAction(dispatch));
  };

  return (
    <>
      <Stack.Navigator headerMode="none" initialRouteName="auth">
        <Stack.Screen name="auth" component={AuthNavigation} />
        <Stack.Screen name="home" component={HomeNavigation} />
      </Stack.Navigator>
      {/* <DropdownAlert
        ref={dropdownalert}
        onClose={() => clearNotification()}
        updateStatusBar={false}
      /> */}
    </>
  );
};

export default () => {
  useEffect(() => {
    // MapboxGL.setAccessToken('pk.eyJ1IjoiYWJpZWxyb2JsZWRvIiwiYSI6ImNrbnlnZTVyajBpaXYyd3BmODNya211NDIifQ.6pVja2oPycvM3dmQlX5boQ');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef} headerMode="none">
          <AppNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
