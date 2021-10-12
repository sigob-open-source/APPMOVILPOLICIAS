// Dependencies
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Button from '../components/button';

import { primaryColor } from '../utils/colors';
import IMAGEN_LOGO from '../../assets/Imagens/Logo.jpg';
import { login } from '../services/auth';
import { notificationAction } from '../store/actions/app';
import { dispatchLogin } from '../store/actions/auth';

const LoginScreen = () => {
  // Refs
  const passwordInput = useRef();

  // States
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Utilities
  const submit = async () => {
    setLoading(true);

    const _email = email.trim();
    const _password = password.trim();

    const response = await login(_email, _password);

    if (response?.access) {
      // Redirect
      dispatchLogin(dispatch, response);

      notificationAction(dispatch, {
        type: 'info',
        title: 'Sesión iniciada',
        message: 'Ha iniciado sesión.',
      });

      return navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'loading' }],
        }),
      );
    }

    notificationAction(dispatch, {
      type: 'warnign',
      title: 'Error',
      message: 'Credenciales no válidas',
    });

    setLoading(false);
    return passwordInput.current.focus();
  };

  return (
    <View style={styles.Container}>
      <View style={styles.logoContainer}>
        <Image source={IMAGEN_LOGO} style={styles.imgLogo} />
      </View>

      <TextInput
        style={styles.inputNumeroDeAgente}
        value={email}
        onChangeText={setEmail}
        placeholder="Numero de agente"
        placeholderTextColor="#CBCBCB"
        editable={!loading}
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordInput.current.focus()}
        autoCapitalize="none"
      />

      <TextInput
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        style={styles.inputContraseña}
        placeholder="Contraseña"
        placeholderTextColor="#CBCBCB"
        editable={!loading}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={submit}
        autoCapitalize="none"
      />

      <Button
        onPress={submit}
        style={{ marginBottom: 20, marginTop: 20 }}
        loading={loading}
        text="INICIAR SESIÓN"
      />

      <TouchableWithoutFeedback style={{ alignItems: 'center' }}>
        <Text style={{ color: primaryColor }}> Olvide mi contraseña</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
    color: '#000000',
  },
  inputContraseña: {
    height: 50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    padding: 15,
    color: '#000000',
  },
  imgLogo: {
    resizeMode: 'contain',
    width: '95%',
  },
});

export default LoginScreen;
