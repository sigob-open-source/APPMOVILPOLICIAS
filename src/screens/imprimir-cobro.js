import React from 'react';
import styled from 'styled-components/native';
import 'mx.com.netpay.sdk.SmartApiFactory';
import 'mx.com.netpay.sdk.exceptions.SmartApiException';
import 'mx.com.netpay.sdk.models';
import { NativeModules, Button } from 'react-native';

const ImprimirCobroScreen = () => (
  <Container>
    <Text>
      Imprimir cobro screen
    </Text>
  </Container>
);

export default NewModuleButton;

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default ImprimirCobroScreen;
