// Dependencies
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Utilities
import { bgColor, primaryColor } from './src/utils/colors';
import { store, persistor } from './src/store';
import { navigationRef } from './src/utils/navigation';

// Screens
import LoginScreen from './src/screens/VentaLogin';
import InfraccionesComunesScreen from './src/screens/infracciones-comunes';
import MenuPrincipalScreen from './src/screens/MenuPrincicpal';
import CobroScreen from './src/screens/cobro';
import BusquedaDePlacasScreen from './src/screens/BusquedaDePlacas';
import BusquedaDeCiudadanoScreen from './src/screens/BusquedaDeCiudadano';
import InfraccionesScreen from './src/screens/infracciones';
// import MenuPrincicpal from './src/screens/MenuPrincicpal';
// import BusquedaDePlacas from './src/screens/BusquedaDePlacas';
// import BusquedaDeCiudadano from './src/screens/BusquedaDeCiudadano';
// import CargosPadron from './src/screens/CargosPadron';
// import Infracciones from './src/screens/Infracciones';

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
  <Stack.Navigator headerMode="none">
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

  useEffect(() => {
    if (notification && notification.message) {
      dropdownalert.current.alertWithType(
        notification.type,
        notification.title || 'Error',
        notification.message,
      );
    }
  }, [notification]);

  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="home" component={HomeNavigation} />
        <Stack.Screen name="auth" component={AuthNavigation} />
      </Stack.Navigator>
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
