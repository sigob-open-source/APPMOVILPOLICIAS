import React from 'react';
import styled from 'styled-components/native';
import {
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/header';
import CheckMark from '../../assets/Imagens/checkmark.png';
import {SCREEN_WIDTH} from '../utils/constants';
import { CommonActions } from '@react-navigation/routers';


const ReimprimirTicketScreen = () => {
  const navigation=useNavigation();
  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name: 'menu-principal'
        }]
      })
    )
  }

  const reImprimir = async () => {
    try {
      await NativeModules.RNNetPay.printTicket();
      goToHome();
    } catch {
      //DO NOTHING
    }
  }
  return (
    <Container>
      <Header
        title="Pago"
        leftBtnIcon="ios-close-outline"
        leftBtnOnPress={goToHome}
      />
      <InnerContainer>
        <TopContainer>
          <Image source={CheckMark}></Image>
          <Title>
            !Pago Exitoso!
          </Title>
        </TopContainer>
        <Button onPress={reImprimir}>
          <ButtonText>
            Reimprimir Recibo
          </ButtonText>
        </Button>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const InnerContainer = styled.View`
  flex: 1; 
  padding-horizontal: 20px;
`;

const TopContainer = styled.View`
  flex: 1; 
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  aspect-ratio: 1;
  width: ${SCREEN_WIDTH *0.3}px;
  height: ${SCREEN_WIDTH *0.3}px;
  margin-bottom: 15px;
  resize-mode: contain;
`;

const Title = styled.Text`
  color: #141414;
  font-weight: 500;
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  background-color: #141414;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
`;

export default ReimprimirTicketScreen;
