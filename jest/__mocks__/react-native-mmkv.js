exports.createMMKV = () => ({
  getString: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
  contains: jest.fn(),
  getAllKeys: jest.fn(() => []),
  clearAll: jest.fn(),
});
