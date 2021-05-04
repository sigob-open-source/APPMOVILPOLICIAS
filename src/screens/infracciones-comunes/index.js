// Dependencies
import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components';

import { useNavigation } from '@react-navigation/native';
import ListItem from './components/list-item';
import Header from '../../components/header';
import Button, { Text as ButtonText } from '../../components/button';
import { getCargos } from '../../services/tipos-de-cargo';

export default function InfraccionesComunesScreen({ route: { params } }) {
  // States
  const [selectedItems, setSelectedItems] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigation = useNavigation();

  const toggleSelect = (idx, item) => {
    const copy = { ...selectedItems };
    if (copy[idx]) {
      delete copy[idx];
    } else {
      copy[idx] = item;
    }
    setSelectedItems(copy);
  };

  const getData = async () => {
    setLoading(true);
    const response = await getCargos({
      page: 1,
    });

    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = (screenName) => {
    navigation.navigate(screenName, {
      ...params,
      cargos: selectedItems,
    });
  };

  return (
    <Container>
      <Header
        title="INFRACCIONES COMUNES"
      />

      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            isSelected={Boolean(selectedItems[index])}
            item={item}
            onPress={() => toggleSelect(index, item)}
          />
        )}
      />

      <Button
        onPress={() => navigate('Infracciones')}
        style={{ marginBottom: 15 }}
        disabled={loading}
      >
        <Icon name="ios-add-circle-outline" size={30} color="#ffffff" />
        <ButtonText>
          AGREGAR MÁS INFRACCIONES
        </ButtonText>
      </Button>

      <SafeAreaView style={{ paddingBottom: 15 }}>
        <Button
          onPress={() => navigate('Cobro')}
          // onPress={() => navigation.navigate('Cobro')}
          text="COBRAR"
          disabled={loading}
        />
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: 15px;
`;
