// Dependencies
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DropdownAlert from 'react-native-dropdownalert';

// Utilities
import { bgColor, primaryColor } from './src/utils/colors';
import { store, persistor } from './src/store';
import { navigationRef } from './src/utils/navigation';

// Screens
import LoginScreen from './src/screens/Login';
import InfraccionesComunesScreen from './src/screens/infracciones-comunes';
import MenuPrincipalScreen from './src/screens/MenuPrincicpal';
import CobroScreen from './src/screens/cobro';
import BusquedaDePlacasScreen from './src/screens/BusquedaDePlacas';
import BusquedaDeCiudadanoScreen from './src/screens/BusquedaDeCiudadano';
import InfraccionesScreen from './src/screens/infracciones';
import LoadingScreen from './src/screens/loading';
import { clearNotificationAction } from './src/store/actions/app';

// Setup
const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: bgColor,
    primary: primaryColor,
  },
};
const Stack = createStackNavigator();

// Navigators
const AuthNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Loading">
    <Stack.Screen name="Loading" component={LoadingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const HomeNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="MenuPrincipal" component={MenuPrincipalScreen} />
    <Stack.Screen name="BusquedasDePlacas" component={BusquedaDePlacasScreen} />
    <Stack.Screen name="BusquedaDeCiudadano" component={BusquedaDeCiudadanoScreen} />
    <Stack.Screen name="Infracciones" component={InfraccionesScreen} />
    <Stack.Screen name="InfraccionesComunes" component={InfraccionesComunesScreen} />
    <Stack.Screen name="Cobro" component={CobroScreen} />
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
    clearNotificationAction(dispatch);
  };

  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="auth" component={AuthNavigation} />
        <Stack.Screen name="home" component={HomeNavigation} />
      </Stack.Navigator>

      <DropdownAlert
        ref={dropdownalert}
        onClose={() => clearNotification()}
        updateStatusBar={false}
      />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef} headerMode="none" theme={theme}>
          <AppNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
