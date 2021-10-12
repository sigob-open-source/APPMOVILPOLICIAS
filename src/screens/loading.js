import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { primaryColor } from '../utils/colors';

const LoadingScreen = () => {
  // Hooks
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    let screenName = 'auth';
    const params = { screen: 'login' };

    if (accessToken) {
      screenName = 'home';
      params.screen = 'menu-principal';
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: screenName,
            params,
          },
        ],
      }),
    );
  }, []);

  return (
    <Container>
      <ActivityIndicator color={primaryColor} size="large" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default LoadingScreen;
