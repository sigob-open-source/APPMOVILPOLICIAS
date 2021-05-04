import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { primaryColor } from '../utils/colors';

export default function Loading() {
  // Hooks
  const navigation = useNavigation();

  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
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
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
