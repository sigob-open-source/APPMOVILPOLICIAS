// Dependencies
import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';

import Button from '../../components/button';
import Header from '../../components/header';
import { primaryColor } from '../../utils/colors';
import ListItem from './components/list-item';

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

export default function CobroScreen() {
  // States
  const [metodoDePago, setMetodoDePago] = useState(1);

  return (
    <Container>
      <Header
        goBack
        title="COBRO"
      />
      <Content>

        <TabsContainer>
          <TouchableWithoutFeedback
            onPress={() => setMetodoDePago(1)}
            disabled={metodoDePago === 1}
          >
            <Tab isSelected={metodoDePago === 1}>
              <TabText isSelected={metodoDePago === 1}>
                Tarjeta
              </TabText>
            </Tab>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => setMetodoDePago(2)}
            disabled={metodoDePago === 2}
          >
            <Tab isSelected={metodoDePago === 2}>
              <TabText isSelected={metodoDePago === 2}>
                Referencia
                {'\n'}
                de pago
              </TabText>
            </Tab>
          </TouchableWithoutFeedback>
        </TabsContainer>

        <TotalContainer>
          <BoldText>
            TOTAL A PAGAR
          </BoldText>

          <BoldText style={{ fontSize: 20, textAlign: 'right' }}>
            $1,750189.00
          </BoldText>
        </TotalContainer>

        <ListContainer>
          <FlatList
            contentContainerStyle={{ flex: 1 }}
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onPress={() => {}}
              />
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

const Content = styled.View`
  flex: 1;
  padding-top: 15px;
  padding-horizontal: 15px;
`;

const ButtonContainer = styled(SafeAreaView)`
  padding-horizontal: 15px;
  padding-vertical: 30px;
  elevation: 5;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #F0F0F0;
`;

const ListContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  elevation: 4;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #F0F0F0;
`;

const TotalContainer = styled.View`
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding-horizontal: 20px;
  border-radius: 25px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const NormalText = styled.Text`
  color: #737176;
  font-weight: 400;
  font-size: 16px;
`;

const BoldText = styled(NormalText)`
  font-weight: bold;
  font-size: 18px;
`;

const TabsContainer = styled(TotalContainer)`
  padding: 0px;
  overflow: hidden;
`;

const Tab = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${(props) => (props.isSelected ? primaryColor : '#ffffff')}
  justify-content: center;
  align-items: center;
  `;

const TabText = styled(NormalText)`
  text-align: center;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#737176')}
  text-transform: uppercase;
`;
