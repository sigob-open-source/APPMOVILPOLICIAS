// Dependencies
import React, {useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BaseIcon from 'react-native-vector-icons/Ionicons';
import propTypes from 'prop-types';
import styled from 'styled-components';

export const HEADER_HEIGHT = Platform.OS === 'ios' ? 48 : 56;

export default function Header({
  backgroundColor,
  title,
  children,
  route,
  ...props
}) {
  const navigation = useNavigation();

  useEffect(() => {
    console.log();
  }, [navigation])

  const renderLeftIcon = () => {

    const icon = props.leftBtnIcon;
    let iconName = null;
    if (typeof icon === 'string') {
      iconName = icon;
    }
    if (props.goBack) {
      iconName = 'md-arrow-back';
    }
    if (iconName) {
      return <Icon name={iconName} />;
    }
    return icon;
  };

  const renderRightIcon = () => {
    const icon = props.rightBtnIcon;
    let iconName = null;
    if (typeof icon === 'string') {
      iconName = icon;
    }
    if (iconName) {
      return <Icon name={iconName} />;
    }
    return icon;
  };

  const renderLeftComponent = () => {
    let onPress = props.leftBtnOnPress;
    let shouldReturnElement = !!props.leftBtnIcon;

    if (props.goBack && navigation.dangerouslyGetState().index > 0) {
      onPress = navigation.goBack;
      shouldReturnElement = props.goBack;
    }
    if (shouldReturnElement) {
      return (
        <HeaderBtn disabled={props.leftBtnDisabled} onPress={() => onPress()}>
          {renderLeftIcon()}
        </HeaderBtn>
      );
    }
    return null;
  };

  const renderRightComponent = () => {
    const icon = props.rightBtnIcon;
    let iconName = null;
    if (typeof icon === 'string') {
      iconName = icon;
    }

    if (iconName) {
      <HeaderBtn disabled={props.rightBtnDisabled} onPress={() => props.rightBtnOnPress()}>
        {renderRightIcon()}
      </HeaderBtn>
    }
    return icon;
  };

  return (
    <Container style={{backgroundColor}}>
      <InnerContainer>
        <TitleContainer>
          {
            children || (
              <>
                <HeaderButtonContainer style={{left: 0}}>
                  {renderLeftComponent()}
                </HeaderButtonContainer>
                <Title>
                  {title}
                </Title>
                <HeaderButtonContainer style={{right: 0}}>
                  {renderRightComponent()}
                </HeaderButtonContainer>
              </>
            )
          }
        </TitleContainer>
      </InnerContainer>
    </Container>
  );
}

Header.propTypes = {
  backgroundColor: propTypes.string,
  goBack: propTypes.bool,
  title: propTypes.string,
  leftBtnIcon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  leftBtnOnPress: propTypes.func,
  leftBtnDisabled: propTypes.bool,
  rightBtnIcon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  rightBtnOnPress: propTypes.func,
  rightBtnDisabled: propTypes.bool,
};

Header.defaultProps = {
  backgroundColor: 'transparent',
  goBack: false,
  title: undefined,
  leftBtnIcon: undefined,
  leftBtnOnPress: () => {},
  leftBtnDisabled: false,
  rightBtnIcon: undefined,
  rightBtnOnPress: () => {},
  rightBtnDisabled: false,
}

const Container = styled(SafeAreaView)``;

const InnerContainer = styled.View`
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 50px;
`;

const Title = styled.Text`
  color: #4a4a4a;
  font-size: 18px;
  text-transform: capitalize;
  text-align: center;
`;

const HeaderButtonContainer = styled.View`
  position: absolute;
  height: 100%;
  width: 40px;
`;

const HeaderBtn = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(BaseIcon)`
  font-size: 25px;
  color: #000000;
`;