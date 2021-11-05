import React from 'react';
import styled from 'styled-components/native';
import { NativeModules } from 'react-native';

const ImprimirCobroScreen = () => {
  const printTicket = async () => {
    const response = await NativeModules.RNNetPay.printTicket();
    console.log(response);
  }

  const doTrans = async () => {
    const response = await NativeModules.RNNetPay.doTrans();
    console.log(response);
  }
  return (
    <Container>
      <Text>
        Imprimir cobro screen
      </Text>
      <Button onPress={doTrans}>
        <Text>
          Hacer pago
        </Text>
      </Button>
      <Button onPress={printTicket}> 
        <Text>
          Imprimir Ticket
        </Text>
      </Button>
    </Container>
  )
};

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const Button = styled.TouchableWithOpacity`
  background-color: blue;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;
export default ImprimirCobroScreen;
