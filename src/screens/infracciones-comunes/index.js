// Dependencies
import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components';

import { useNavigation } from '@react-navigation/native';
import ListItem from './components/list-item';
import Header from '../../components/header';
import Button, { Text as ButtonText } from '../../components/button';

const DATA = [
  {
    id: 1,
    clave: 'A12',
    descripcion: 'No respetar seña de alto',
    sm: 15,
  },
  {
    id: 2,
    clave: 'A22',
    descripcion: 'Conducir en exceso de velocidad',
    sm: 30,
  },
  {
    id: 3,
    clave: 'A10',
    descripcion: 'Conducir en estado de ebriedad',
    sm: 10,
  },
  {
    id: 4,
    clave: 'A05',
    descripcion: 'No traer puesto el cinturón de seguridad.Lorem ea in labore do eu dolor dolor.Pariatur exercitation laborum mollit deserunt eiusmod nulla cillum ipsum commodo ad officia.',
    sm: 5,
  },
  {
    id: 5,
    clave: 'AB12',
    descripcion: 'Uso del celular al conducir',
    sm: 12,
  },
];

export default function InfraccionesComunesScreen() {
  // Refs
  const [selectedItems, setSelectedItems] = useState({});

  // Hooks
  const navigation = useNavigation();

  const toggleSelect = (idx) => {
    const copy = { ...selectedItems };
    if (copy[idx]) {
      delete copy[idx];
    } else {
      copy[idx] = true;
    }
    setSelectedItems(copy);
  };

  return (
    <Container>
      <Header
        goBack
        title="INFRACCIONES COMUNES"
      />

      <FlatList
        style={{ flex: 1, paddingTop: 10 }}
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            isSelected={selectedItems[index]}
            item={item}
            onPress={() => toggleSelect(index)}
          />
        )}
      />

      <Button
        onPress={() => navigation.navigate('Infracciones')}
        style={{ marginBottom: 15 }}
      >
        <Icon name="ios-add-circle-outline" size={30} color="#ffffff" />
        <ButtonText>
          AGREGAR MÁS INFRACCIONES
        </ButtonText>
      </Button>

      <SafeAreaView style={{ paddingBottom: 15 }}>
        <Button
          onPress={() => navigation.navigate('Cobro')}
          text="CONTINUAR"
        />
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: 15px;
`;
