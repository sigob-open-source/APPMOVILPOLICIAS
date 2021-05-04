import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { subTo } from 'react-native-redash';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button, { Text as ButtonText } from '../components/button';

export default function BusquedaDePlacas() {
  const navigation = useNavigation();

  const goBuscarCiudadano = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'home', params: { screen: 'BusquedaDeCiudadano' } }],
      }),
    );
  };
  return (
    <View style={styles.Container}>
      <Header
        goBack
        title="DATOS DE PLACAS"
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.tabs}>
          <Text style={styles.txtTabs}>
            Legales
          </Text>
          <Text style={styles.txtTabs}>
            USA
          </Text>
          <Text style={styles.txtTabs}>
            AMPARADA
          </Text>
          <Text style={styles.txtTabs}>
            Sin Placas
          </Text>
        </View>

        <View style={styles.searchInput}>
          <TextInput placeholder="Buscar Placas..." />
        </View>

        <Text style={styles.titulo}>
          271-NSF2
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subTitle}>Marca:</Text>
          <Text style={styles.subTitleModelo}>Modelo:</Text>
        </View>
      </ScrollView>

      <Button
        onPress={goBuscarCiudadano}
        style={{ marginBottom: 20, marginTop: 20 }}
      >
        <ButtonText>
          CONTINUAR
        </ButtonText>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 40,
  },
  txtTabs: {
    margin: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: primaryColor,
    marginTop: 15,
  },
  subTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  subTitleModelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
});
