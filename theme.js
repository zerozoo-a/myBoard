const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  small_0: calcRem(15),
  small: calcRem(25),
  base: calcRem(50),
  basePlus: calcRem(75),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '1024px',
};

const colors = {
  black: '#000000',
  white: '#F8F8F8',
  red50: '#ffebee',
  red100: '#ffcdd2',
  red500: '#f44336',
  pink50: '#fce4ec',
  pink100: '#f8bbd0',
  pink500: '#e91e63',
  purple50: '#f3e5f5',
  purple100: '#e1bee7',
  purple500: '#9c27b0',
  lightBlue50: '#e1f5fe',
  lightBlue100: '#b3e5fc',
  lightBlue500: '#03a9f4',
  yellow50: '#fffde7',
  yellow100: '#fff9c4',
  yellow500: '#ffeb3b',
  orange50: '#fff3e0',
  orange100: '#ffe0b2',
  orange500: '#ff9800',
  grey50: '#fafafa',
  grey100: '#f5f5f5',
  grey500: '#9e9e9e',
  pointColor: 'rgb(101,151,227)',
  deepDarkBackgroundColor: 'rgb(10,15,20)',
  darkBackgroundColor: 'rgb(28,33,39)',
  darkBorderColor: 'rgb(39,43,49)',
  darkColor: 'rgb(202,218,216)',
  darkBorderColor: 'rgb(53,57,63)',
  deepLightBackgroundColor: 'rgb(190,190,190)',
  lightBackgroundColor: 'rgb(244,244,244)',
  lightColor: 'rgb(32,32,32)',
  lightBorderColor: 'rgb(70,80,88)',
};

const button = {
  fontSize: '1rem',
  lineHeight: '2.5em',
  borderRadius: '3px',
  cursor: 'pointer',
  padding: '0.5em',
  paddingSmall: '0.1em',
  margin: '0.4em',
  marginSmall: '0.1em',
  submitColor: 'rgb(244,244,244)',
  submitBackgroundColor: 'rgb(81,133,62)',
  submitBorderColor: 'rgb(96,158,75)',
  pointColor: 'rgb(101,151,227)',
  pointBorder: 'rgb(133,181,255)',
};
const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  button,
};

export default theme;
