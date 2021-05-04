// Dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import styled from 'styled-components';
import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button, { Text as ButtonText } from '../components/button';
import {
  Tab as TabBase,
  TabsContainer as TabsContainerBase,
  TabText as TabTextBase,
} from './cobro';

export default function BusquedaDePlacas() {
  // States
  const [hasDriverLicense, setHasDriverLicense] = useState(true);

  // Hooks
  const navigation = useNavigation();

  // Utils
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
        title="DATOS DEL CONDUCTOR"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17 }}>
              ¿Cuenta con licencia?
            </Text>
          </View>

          <TabsContainer>
            <TouchableWithoutFeedback
              onPress={() => setHasDriverLicense(true)}
              disabled={hasDriverLicense}
            >
              <Tab isSelected={hasDriverLicense}>
                <TabText isSelected={hasDriverLicense}>
                  SÍ
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setHasDriverLicense(false)}
              disabled={!hasDriverLicense}
            >
              <Tab isSelected={!hasDriverLicense}>
                <TabText isSelected={!hasDriverLicense}>
                  NO
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

          </TabsContainer>
        </View>

        <View style={styles.searchInput}>
          <TextInput
            placeholder="Buscar Placas..."
            placeholderTextColor="#CBCBCB"
            style={{ color: '#000000' }}
          />
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
        style={{ margin: 20 }}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
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
    color: '#000000',
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

const TabsContainer = styled(TabsContainerBase)`
  height: 30px;
  width: 120px;
  margin-top: 15px;
`;

const Tab = styled(TabBase)``;

const TabText = styled(TabTextBase)`
  font-size: 12px;
`;
