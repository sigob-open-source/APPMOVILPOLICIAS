// Dependencies
import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native';
import styled from 'styled-components';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import Button from '../../components/button';
import Header from '../../components/header';
import { primaryColor } from '../../utils/colors';
import ListItem from './components/list-item';
import { SCREEN_WIDTH } from '../../utils/constants';
import { createCargo } from '../../services/cargos';
import { generarPago } from '../../services/recibo';
import { logger } from '../../utils/logger';
import { notificationAction } from '../../store/actions/app';
import { getUmas } from '../../services/umas';

const printTicket = async () => {
  const response = await NativeModules.RNNetPay.printTicket();
  console.log(response);
};

const doTrans = async () => {
  const response = await NativeModules.RNNetPay.doTrans();
  console.log(response);
};

const CobroScreen = ({ route: { params } }) => {
  // States
  const [metodoDePago, setMetodoDePago] = useState(1);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uma, setUma] = useState(0);

  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getUma();
    generarCargos(Object.values(params.cargos)).then((cargos) => {
      setListData(cargos);
    });
  }, []);

  const generarCargos = async (tiposDeCargo) => {
    const calls = [];
    for (let i = 0; i < tiposDeCargo.length; i++) {
      calls.push(createCargo(
        tiposDeCargo[i].id,
        tiposDeCargo[i].importe,
        params.car.id,
      ));
    }

    const responseCargos = await Promise.all(calls);
    return responseCargos.reduce((previous, current) => previous.concat(current), []);
  };

  const reprintTicket = () => {
    navigation.navigate('reimpresion-ticket');
  };

  const getUma = async () => {
    const response = await getUmas();
    setUma(response[response.length - 1]?.valor_diario ?? 0);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (value < -(SCREEN_WIDTH * 0.75)) {
      deleteItemById(parseInt(key, 10));
    }
  };

  const renderHiddenItem = ({ item }) => (
    <DeleteContainer>
      <TouchableWithoutFeedback onPress={() => deleteItemById(item.id)}>
        <Icon name="ios-trash-outline" color="#ffffff" size={30} />
      </TouchableWithoutFeedback>
    </DeleteContainer>
  );

  const deleteItemById = (id) => {
    setListData(listData.filter((x) => x.id !== id));
  };

  const total = useMemo(() =>
    // return listData.reduce((p, c) => p + (uma * c.importe_maximo), 0);
    listData.reduce((p, x) => p + x?.importe ?? 0, 0),
  [listData]);

  const calcular = async () => {
    setLoading(true);

    const response = await generarPago(
      params.car.id,
      listData.map((x) => x.id),
      total.toFixed(2),
    );

    if (response) {
      const paymentResponse = await NativeModules.RNNetPay.doTrans(total.toFixed(2));
      console.log('entro a la 112');

      if (paymentResponse.success) {
        logger(response.recibos[0].id);
        const ticketResponse = await NativeModules.RNNetPay.printTicket();

        if (ticketResponse.success) {
          notificationAction(dispatch, {
            type: 'success',
            title: 'Pago realizado',
            message: `El pago se ha procesado exitosamente (Recibo #${response.recibos[0].id})`,
          });

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'reimpresion',
                  params: {},
                },
              ],
            }),
          );
        } else {
          notificationAction(dispatch, {
            type: 'error',
            title: 'Error',
            message: 'No se pudo generar el Ticket',
          });
        }
      }
    } else {
      notificationAction(dispatch, {
        type: 'error',
        title: 'Error',
        message: 'No se pudo generar el pago',
      });
    }
    setLoading(false);
  };

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
            $
            {total.toFixed(2)}
          </BoldText>
        </TotalContainer>

        <ListContainer>
          <SwipeListView
            disableLeftSwipe={loading}
            data={listData}
            keyExtractor={(item) => item.id.toString()}
            disableRightSwipe
            friction={10}
            onSwipeValueChange={onSwipeValueChange}
            renderHiddenItem={renderHiddenItem}
            renderItem={({ item }) => <ListItem item={item} />}
            rightOpenValue={-100}
            useNativeDriver={false}
            ItemSeparatorComponent={Separator}
          />
        </ListContainer>

      </Content>
      <ButtonContainer>
        <Button
          loading={loading}
          onPress={doTrans}
          onPress={calcular}
          text="COBRAR"
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  padding-top: 15px;
  padding-horizontal: 15px;
`;

export const ButtonContainer = styled(SafeAreaView)`
  padding-horizontal: 15px;
  padding-vertical: 30px;
  elevation: 5;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #F0F0F0;
`;

export const ListContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  elevation: 4;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
`;

export const Separator = styled.View`
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

export const TabsContainer = styled(TotalContainer)`
  padding: 0px;
  overflow: hidden;
`;

export const Tab = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${(props) => (props.isSelected ? primaryColor : '#ffffff')}
  justify-content: center;
  align-items: center;
`;

export const TabText = styled(NormalText)`
  text-align: center;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#737176')}
  text-transform: uppercase;
`;

const DeleteContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: red;
  align-items: flex-end;
  justify-content: center;
  padding-right: 32px;
`;

export default CobroScreen;
