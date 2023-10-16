import '@testing-library/jest-dom'

/**
 * Fix Bugs: 
 * Ref: 
 * https://github.com/ant-design/ant-design/issues/21096
 * https://github.com/haile-vnm/giresea/issues/1
 */
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};