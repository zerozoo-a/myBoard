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
  base: calcRem(50),
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
  white: '#FFFFFF',
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
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const darkMode = {
  colors: {
    titleColor: '#121212',
    bgColor: '#b8b8b8',
  },
};
const lightMode = {
  colors: {
    titleColor: '#b8b8b8',
    bgColor: '#121212',
  },
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
  darkMode,
  lightMode,
};

export default theme;
