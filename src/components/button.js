// Dependencies
import React from 'react';
import { ViewPropTypes, TouchableWithoutFeedback } from 'react-native';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { primaryColor } from '../utils/colors';

export default function Button({
  text,
  onPress,
  children,
  style,
  textStyle,
  disabled,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <Container style={style}>
        {
          children || (
            <Text style={textStyle}>
              {text}
            </Text>
          )
      }
      </Container>
    </TouchableWithoutFeedback>
  );
}

Button.propTypes = {
  text: propTypes.string,
  onPress: propTypes.func.isRequired,
  style: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  text: undefined,
  style: {},
  textStyle: {},
  disabled: false,
};

const Container = styled.View`
  height: 55px;
  background-color: ${primaryColor};
  border-radius: 25px;
  padding-horizontal: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Text = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
