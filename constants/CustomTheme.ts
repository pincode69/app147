import { DefaultTheme } from '@react-navigation/native';

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgba(236, 95, 95, 1)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgba(48, 48, 48, 1)',
    border: 'rgba(237, 239, 242, 1)',
    notification: 'rgb(255, 59, 48)',
  },
  ...DefaultTheme.fonts
};
