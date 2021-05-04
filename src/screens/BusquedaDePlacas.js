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
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import Header from '../components/header';
import { primaryColor } from '../utils/colors';
import Button from '../components/button';
import {
  Tab,
  TabsContainer,
  TabText as TabTextBase,
} from './cobro';

export default function BusquedaDePlacas() {
  // Refs
  const [selectedTab, setSelectedTab] = useState(1);

  // States
  const [plates, setPlates] = useState();
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigation = useNavigation();

  // Utilities
  const goBuscarCiudadano = () => {
    setLoading(true);

    navigation.navigate('BusquedaDeCiudadano');
  };

  return (
    <>
      <Header
        goBack
        title="DATOS DE PLACAS"
      />

      <View style={styles.Container}>
        <ScrollView style={{ flex: 1 }}>
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

          <View style={styles.searchInput}>
            <TextInput
              value={plates}
              onChangeText={setPlates}
              placeholder="Buscar Placas..."
              placeholderTextColor="#CBCBCB"
              style={{ color: '#000000' }}
            />
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
          text="CONTINUAR"
          loading={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 40,
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
