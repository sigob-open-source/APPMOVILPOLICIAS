// Dependencies
import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../components/header';
import Button, { Text as ButtonText } from '../../components/button';

import { Separator, ListContainer, ButtonContainer } from '../cobro';
import ListItem from '../cobro/components/list-item';

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
  {
    id: 6,
    clave: 'AB12',
    descripcion: 'Uso del celular al conducir',
    sm: 12,
  },
  {
    id: 7,
    clave: 'AB12',
    descripcion: 'Uso del celular al conducir',
    sm: 12,
  },
  {
    id: 8,
    clave: 'AB12',
    descripcion: 'Uso del celular al conducir',
    sm: 12,
  },
  {
    id: 9,
    clave: 'AB12',
    descripcion: 'Uso del celular al conducir',
    sm: 12,
  },
];

export default function InfraccionesScreen() {
  // states
  const [selectedItem, setSelectedItem] = useState(null);

  const addCharge = () => {
    setSelectedItem(null);
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
                    {selectedItem.sm}
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
            data={DATA}
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
          onPress={() => {}}
          text="COBRAR"
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

const SearchContainer = styled.View`
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

const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 20px;
  font-size: 16px;
  color: #000000;
`;

const SearchButton = styled.View`
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
