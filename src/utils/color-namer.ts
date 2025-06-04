import namer from 'color-namer';

export const getColorName = (hex: string): string => {
  return namer(hex).ntc[0].name;
};

// Usage
