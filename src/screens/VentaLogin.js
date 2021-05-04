import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Button, { Text as ButtonText } from '../components/button';
import { primaryColor } from '../utils/colors';
import IMAGEN_LOGO from '../../assets/Imagens/Logo.jpg';

export default function VentaLogin() {
  const navigation = useNavigation();

  const login = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'home', params: { screen: 'MenuPrincipal' } }],
      }),
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.logoContainer}>
        <Image source={IMAGEN_LOGO} style={styles.imgLogo} />
      </View>

      <TextInput style={styles.inputNumeroDeAgente} placeholder="Numero de agente" />

      <TextInput style={styles.inputContraseña} placeholder="Contraseña" />

      <Button
        onPress={login}
        style={{ marginBottom: 20, marginTop: 20 }}
      >
        <ButtonText>
          INICIAR SESIÓN
        </ButtonText>
      </Button>
      <TouchableWithoutFeedback style={{ alignItems: 'center' }}>
        <Text style={{ color: primaryColor }}> Olvide mi contraseña</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  inputNumeroDeAgente: {
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    padding: 15,
  },
  inputContraseña: {
    height: 50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    padding: 15,
  },
  imgLogo: {
    resizeMode: 'contain',
    width: '95%',
  },
});
