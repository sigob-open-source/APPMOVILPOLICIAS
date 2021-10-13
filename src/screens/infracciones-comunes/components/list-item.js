// Dependencies
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';

const HIGHLIGHT_COLOR = '#0090DB';

export default function ListItem({
  item,
  onPress,
  isSelected,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container style={{ backgroundColor: isSelected ? HIGHLIGHT_COLOR : '#F7F7F7' }}>
        <ClaveContainer>
          <BoldText style={{ color: isSelected ? '#ffffff' : '#8C8990' }}>
            {item.clave}
          </BoldText>
        </ClaveContainer>

        <DescriptionContainer>
          <NormalText style={{ color: isSelected ? '#ffffff' : '#8C8990' }}>
            {item.descripcion}
          </NormalText>
        </DescriptionContainer>

        <TotalContainer style={{ flexDirection: 'row' }}>
          <BoldText style={{ color: isSelected ? '#ffffff' : HIGHLIGHT_COLOR }}>
            {String(item.importe).padStart(2, '0')}
          </BoldText>
          <BoldText style={{ color: isSelected ? '#ffffff' : '#BBBCC0' }}>
            { ' ' }
            UMA
          </BoldText>
          <Dot />
        </TotalContainer>

      </Container>
    </TouchableWithoutFeedback>
  );
}

export const Container = styled.View`
  height: auto;
  min-height: 60px;
  border-radius: 30px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  flex-direction: row;
  align-items: center;
  elevation: 5;
  margin: 5px;
`;

export const ClaveContainer = styled.View`
  width: 60px;
  justify-content: center;
  padding-left: 5px;
`;

export const NormalText = styled.Text`
  font-size: 12px;
`;

export const BoldText = styled(NormalText)`
  font-size: 14px;
  font-weight: bold;
`;

export const DescriptionContainer = styled.View`
  flex: 1;
`;

export const TotalContainer = styled.View`
  align-items: center;
  margin-left: 5px;
`;

export const Dot = styled.View`
  height: 10px;
  width: 10px;
  background-color: #00FFFA;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${HIGHLIGHT_COLOR};
  margin-horizontal: 5px;
`;
