const mockClient = {
  connect: jest.fn().mockResolvedValue(undefined),
  get: jest.fn().mockImplementation((key: string, callback: Function) => {
    const data: { [key: string]: string } = { key1: 'value1' /* ... other keys and values ... */ };
    callback(null, data[key]);
  }),
  set: jest.fn().mockResolvedValue(undefined),
};

export const createClient = jest.fn().mockReturnValue({
  connect: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
});