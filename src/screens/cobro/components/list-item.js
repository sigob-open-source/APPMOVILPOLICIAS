// Dependencies
import React from 'react';
import styled from 'styled-components';

import {
  Container as BaseContainer,
  BoldText,
  ClaveContainer,
  DescriptionContainer,
  Dot,
  NormalText,
  TotalContainer,
} from '../../infracciones-comunes/components/list-item';

export default function ListItem({
  item,
}) {
  return (
    <Container>
      <ClaveContainer>
        <BoldText>
          {item.clave}
        </BoldText>
      </ClaveContainer>

      <DescriptionContainer>
        <NormalText>
          {item.descripcion}
        </NormalText>
      </DescriptionContainer>

      <TotalContainer style={{ flexDirection: 'row' }}>
        <BoldText>
          {String(item.sm).padStart(2, '0')}
        </BoldText>
        <BoldText>
          { ' ' }
          SM
        </BoldText>
        <Dot style={{ marginLeft: 10 }} />
      </TotalContainer>

    </Container>
  );
}

const Container = styled(BaseContainer)`
  background-color: #ffffff;
  border-radius: 0px;
  margin: 0px;
  elevation: 0;
  padding-horizontal: 5px;
`;
