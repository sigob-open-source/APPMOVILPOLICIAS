// Dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch } from 'react-redux';
import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button from '../components/button';
import {
  Tab,
  TabsContainer,
  TabText as TabTextBase,
} from './cobro';
import { SearchButton, SearchContainer, SearchInput } from './infracciones';
import { createVehiculo, getVehiculos } from '../services/vehiculo';
import { notificationAction } from '../store/actions/app';

export default function BusquedaDePlacas() {
  // Refs
  const [selectedTab, setSelectedTab] = useState(1);

  // States
  const [search, setSearch] = useState('');
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Utilities
  const goBuscarCiudadano = () => {
    if (!car) {
      notificationAction(dispatch, {
        type: 'warn',
        title: 'Alerta',
        message: 'No ha ingresado los datos de las placas.',
      });
    } else {
      navigation.navigate('BusquedaDeCiudadano', {
        car,
      });
    }
  };

  const getVehiculo = async () => {
    setLoading(true);
    const _search = search.trim();

    let found = false;
    if (_search) {
      const params = {};
      if (selectedTab < 4) {
        params.numero_de_placa = _search;
      } else {
        params.serie = _search;
      }

      const response = await getVehiculos(params);

      if (Array.isArray(response) && response.length > 0) {
        found = true;
        setCar(response[0]);
      } else {
        const createResponse = await createVehiculo(
          selectedTab < 4 ? _search : null,
          selectedTab === 4 ? _search : null,
        );

        if (createResponse) {
          found = true;
          setCar(createResponse);
        }
      }
    }

    if (!found) {
      notificationAction(dispatch, {
        type: 'error',
        title: 'Error',
        message: 'No se encontró el vehículo.',
      });
    }
    setSearch('');
    setLoading(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <Header
        goBack
        title="DATOS DE PLACAS"
      />

      <View style={styles.Container}>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
          <TabsContainer>
            <TouchableWithoutFeedback
              onPress={() => setSelectedTab(1)}
              disabled={selectedTab === 1}
            >
              <Tab isSelected={selectedTab === 1}>
                <TabText isSelected={selectedTab === 1}>
                  Legales
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setSelectedTab(2)}
              disabled={selectedTab === 2}
            >
              <Tab isSelected={selectedTab === 2}>
                <TabText isSelected={selectedTab === 2}>
                  USA
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setSelectedTab(3)}
              disabled={selectedTab === 3}
            >
              <Tab isSelected={selectedTab === 3}>
                <TabText isSelected={selectedTab === 3}>
                  AMPARADA
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setSelectedTab(4)}
              disabled={selectedTab === 4}
            >
              <Tab isSelected={selectedTab === 4}>
                <TabText isSelected={selectedTab === 4}>
                  SIN
                  {'\n'}
                  PLACAS
                </TabText>
              </Tab>
            </TouchableWithoutFeedback>

          </TabsContainer>

          <SearchContainer>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder={`Buscar ${selectedTab < 4 ? 'Placas' : 'Número de serie'}...`}
              placeholderTextColor="#CBCBCB"
              returnKeyType="search"
              autoCapitalize="characters"
              onSubmitEditing={getVehiculo}
            />
            <TouchableWithoutFeedback onPress={getVehiculo} disabled={loading}>
              <SearchButton>
                <Icon name="ios-search-outline" size={30} color="#A8A4AE" />
              </SearchButton>
            </TouchableWithoutFeedback>
          </SearchContainer>

          {
            Boolean(car) && (
              <>
                <Text style={styles.titulo}>
                  {
                    car.numero_de_placa || car.serie
                  }
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.subTitle}>Marca:</Text>
                  <Text style={styles.subTitleModelo}>Modelo:</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.subTitle, { color: primaryColor }]}>
                    No disponible
                  </Text>
                  <Text style={[styles.subTitleModelo, { color: primaryColor }]}>
                    No disponible
                  </Text>
                </View>
              </>
            )
          }
        </ScrollView>

        <Button
          onPress={goBuscarCiudadano}
          style={{ marginBottom: 20, marginTop: 20 }}
          text="CONTINUAR"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 15,
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

const TabText = styled(TabTextBase)`
  font-size: 12px;
`;
