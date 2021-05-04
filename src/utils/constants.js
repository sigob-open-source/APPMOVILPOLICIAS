// Dependencies
import { Platform, Dimensions } from 'react-native';

const { OS } = Platform;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const UMA = 89.62;

export {
  OS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  UMA,
};
