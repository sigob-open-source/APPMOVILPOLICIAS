import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { primaryColor } from '../utils/colors';

import Header from '../components/header';

const MenuPrincicpalScreen = () => {
  const navigation = useNavigation();

  const goBusqueda = () => {
    navigation.navigate('busquedas-de-placas');
  };

  return (
    <>
      <Header title="MENU PRINCIPAL" />
      <View style={styles.Container}>
        <TouchableWithoutFeedback onPress={goBusqueda}>
          <View style={styles.generarMulta}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#ffffff', fontSize: 30 }}>
                GENERAR
              </Text>
              <Text style={{ color: '#ffffff', fontSize: 30, fontWeight: 'bold' }}>
                MULTA
              </Text>
            </View>
            <Icon name="ios-finger-print" size={95} color="#ffffff" />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.generarMulta}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 30,
              }}
            >
              REGISTRAR
            </Text>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              VISITA
            </Text>
          </View>
          <Icon name="ios-finger-print" size={95} color="#ffffff" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  generarMulta: {
    marginTop: 20,
    backgroundColor: primaryColor,
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
});

export default MenuPrincicpalScreen;
