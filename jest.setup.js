import '@testing-library/jest-dom';

if (typeof window === 'undefined') {
  global.window = {};
}

if (typeof document === 'undefined') {
  global.document = {
    createElement: () => ({}),
    body: {},
  };
}
