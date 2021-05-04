import React from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button, { Text as ButtonText } from '../components/button';

export default function BusquedaDePlacas() {
  const navigation = useNavigation();

  const goInfraccionesComunes = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'home', params: { screen: 'InfraccionesComunes' } }],
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
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Text style={{ flex: 1, fontSize: 17 }}>
            Cuenta con licencia?
          </Text>
          <View style={styles.tabs}>
            <Text style={styles.txtTabs}>
              Si
            </Text>
            <Text style={styles.txtTabs}>
              No
            </Text>
          </View>
        </View>

        <View style={styles.searchInput}>
          <TextInput placeholder="Buscar Placas..." />
        </View>

        <View style={styles.ciudadanoContainer}>
          <View style={styles.nombreCiudano}>
            <Text>Nombre:</Text>
            <Text style={styles.titulo}>Abiel Oswaldo Robledo Montoya</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text>
                Edad:
              </Text>

              <Text>
                Mexicali B.C
              </Text>
            </View>
            <View style={styles.statusCuidadanos}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                Vencida
              </Text>

            </View>
          </View>
        </View>
      </ScrollView>

      <Button
        onPress={goInfraccionesComunes}
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
    width: 120,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginTop: 5,
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
  ciudadanoContainer: {
    width: 300,
    height: 300,
    borderRadius: 25,
    marginTop: 25,

  },
  statusCuidadanos: {
    height: 40,
    width: 160,
    backgroundColor: '#EC4974',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
