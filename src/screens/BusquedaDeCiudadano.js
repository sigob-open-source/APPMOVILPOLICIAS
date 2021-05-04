// Dependencies
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button, { Text as ButtonText } from '../components/button';
import {
  Tab as TabBase,
  TabsContainer as TabsContainerBase,
  TabText as TabTextBase,
} from './cobro';

import { SearchButton, SearchContainer, SearchInput } from './infracciones';
import { getCiudadanos } from '../services/ciudadanos';
import { notificationAction } from '../store/actions/app';

export default function BusquedaDePlacas({ route: { params } }) {
  // States
  const [hasDriverLicense, setHasDriverLicense] = useState(true);
  const [ciudadano, setCiudadano] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Utils
  const goInfraccionesComunes = () => {
    if (hasDriverLicense && !ciudadano) {
      notificationAction(dispatch, {
        type: 'error',
        title: 'Error',
        message: 'No se ha ingresado la licencia de conducir.',
      });
    } else {
      navigation.navigate('InfraccionesComunes', {
        ...params,
        ciudadano,
      });
    }
  };

  const getCiudadano = async () => {
    setLoading(true);
    const _search = search.trim();

    let found = false;
    if (_search) {
      const response = await getCiudadanos({
        licencia_de_conducir: _search,
      });

      if (Array.isArray(response) && response.length > 0) {
        found = true;
        setCiudadano(response[0]);
      }
    }

    if (!found) {
      notificationAction(dispatch, {
        type: 'error',
        title: 'Error',
        message: 'No se encontró el ciudadano.',
      });
    }
    setSearch('');
    setLoading(false);
    Keyboard.dismiss();
  };

  const getNombreCompleto = () => {
    let output = '';

    if (ciudadano) {
      if (ciudadano.first_name) {
        output += ciudadano.first_name;
      }

      if (ciudadano.last_name) {
        if (output) {
          output += ' ';
        }
        output += ciudadano.last_name;
      }

      if (ciudadano.second_last_name) {
        if (output) {
          output += ' ';
        }
        output += ciudadano.second_last_name;
      }
    }

    return output;
  };

  const getEdad = () => {
    let output = '';

    if (ciudadano) {
      const now = moment();
      const birthday = moment(ciudadano.fecha_nacimiento, 'YYYY-MM-DD');

      output = now.diff(birthday, 'years');
    }
    return output;
  };

  return (
    <View style={styles.Container}>
      <Header
        goBack
        title="DATOS DEL CONDUCTOR"
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
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

        {
          hasDriverLicense && (
            <SearchContainer>
              <SearchInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar número de licencia..."
                placeholderTextColor="#CBCBCB"
                returnKeyType="search"
                autoCapitalize="characters"
                onSubmitEditing={getCiudadano}
              />
              <TouchableWithoutFeedback onPress={getCiudadano} disabled={loading}>
                <SearchButton>
                  <Icon name="ios-search-outline" size={30} color="#A8A4AE" />
                </SearchButton>
              </TouchableWithoutFeedback>
            </SearchContainer>
          )
        }

        {
          Boolean(ciudadano) && (

          <View style={styles.ciudadanoContainer}>
            <View style={styles.nombreCiudano}>
              <Text>Nombre:</Text>
              <Text style={styles.titulo}>
                {getNombreCompleto()}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text>
                  Edad:
                  {' '}
                  {getEdad()}
                </Text>
                {/*
                <Text>
                  Mexicali B.C
                </Text> */}
              </View>
              {/* <View style={styles.statusCuidadanos}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                  Vencida
                </Text>
              </View> */}
            </View>
          </View>
          )
        }

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
    paddingHorizontal: 15,
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
