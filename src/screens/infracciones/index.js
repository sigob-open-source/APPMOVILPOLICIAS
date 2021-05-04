// Dependencies
import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';
import Button, { Text as ButtonText } from '../../components/button';

import { Separator, ListContainer, ButtonContainer } from '../cobro';
import ListItem from '../cobro/components/list-item';
import { getCargos } from '../../services/tipos-de-cargo';
import { useDebounce } from '../../utils/hooks';

export default function InfraccionesScreen({ route: { params } }) {
  // states
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState('');

  // Hooks
  const navigation = useNavigation();
  const debouncedSearch = useDebounce(search, 1200);

  const getData = async () => {
    setLoading(true);
    const response = await getCargos();

    setData(response);
    setLoading(false);
    setSearch('');
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setListData(data);
  }, [data]);

  useEffect(() => {
    if (debouncedSearch) {
      const regexp = new RegExp(debouncedSearch, 'ig');
      setListData(data.filter((x) => regexp.test(x.descripcion)));
    } else {
      setListData(data);
    }
  }, [debouncedSearch]);

  const addCharge = () => {
    const copy = { ...selectedItems, [selectedItem.id]: selectedItem };
    setSelectedItems(copy);
    setData(data.filter((x) => x.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const navigate = () => {
    navigation.navigate('Cobro', {
      ...params,
      cargos: {
        ...params.cargos,
        ...selectedItems,
      },
    });
  };

  return (
    <Container>
      <Header
        goBack
        title="INFRACCIONES"
      />
      <Content>

        <SearchContainer>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Inciso"
            placeholderTextColor="#CBCBCB"
          />
          <TouchableWithoutFeedback onPress={() => {}}>
            <SearchButton>
              <Icon name="ios-search-outline" size={30} color="#A8A4AE" />
            </SearchButton>
          </TouchableWithoutFeedback>
        </SearchContainer>

        {
          selectedItem && (
            <>
              <ChargeContainer>
                <ChargeDescriptionContainer>
                  <ChargeDescription>
                    {selectedItem.descripcion}
                  </ChargeDescription>
                </ChargeDescriptionContainer>

                <ChargeTotalContainer>
                  <ChargeTotal>
                    {selectedItem.importe}
                  </ChargeTotal>
                  <ChargeUnit>
                    SALARIOS
                    {'\n'}
                    MÍNIMOS
                  </ChargeUnit>
                </ChargeTotalContainer>
              </ChargeContainer>

              <Button
                onPress={addCharge}
                style={{ marginBottom: 15 }}
              >
                <Icon name="ios-add-circle-outline" size={30} color="#ffffff" />
                <ButtonText>
                  AGREGAR
                </ButtonText>
              </Button>
            </>
          )
        }

        <ListContainer>
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => setSelectedItem(item)}>
                <ListItem item={item} />
              </TouchableHighlight>
            )}
            ItemSeparatorComponent={Separator}
          />
        </ListContainer>

      </Content>

      <ButtonContainer>
        <Button
          onPress={navigate}
          text="COBRAR"
          disabled={loading}
        />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Content = styled(Container)`
  padding-horizontal: 15px;
`;

export const SearchContainer = styled.View`
  height: 55px;
  width: 100%;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 5px;
  border-width: 1px;
  border-color: #DCD9E0;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 20px;
  font-size: 16px;
  color: #000000;
`;

export const SearchButton = styled.View`
  width: 55px;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #F6F5F5;
`;

const ChargeContainer = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  margin-bottom: 10px;
`;

const ChargeDescriptionContainer = styled(ScrollView)`
  flex: 1;
  margin-right: 5px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #DCD9E0;
  padding-horizontal: 5px;
`;

const ChargeDescription = styled.Text`
  color: #B7B7B7;
  font-size: 14px;
`;

const ChargeTotalContainer = styled.View`
  height: 100%;
  background-color: #ffffff;
  align-items: center;
  padding: 10px;
  border-width: 1px;
  border-color: #DCD9E0;
`;

const ChargeTotal = styled.Text`
  flex: 1;
  color: #1B8ED6;
  font-size: 32px;
  font-weight: bold;
`;

const ChargeUnit = styled.Text`
  font-size: 12px;
  color: #B7B7B7;
`;
