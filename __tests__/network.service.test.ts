const createMockAxiosInstance = () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
});

jest.mock('axios', () => ({
  create: jest.fn(() => createMockAxiosInstance()),
}));

jest.mock('@config/api.routes', () => ({
  API_ROUTES: {
    ROOT: 'https://api.example.com',
    PRODUCTS: '/products',
  },
}));

import axiosService from '@modules/network/infrastructure/axios.service';

describe('AxiosService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('performs GET request', async () => {
    const mockData = { id: '1', name: 'Test' };
    (axiosService as any).axiosInstance.get.mockResolvedValue({
      data: mockData,
    });

    const result = await axiosService.get<typeof mockData>('/test');
    expect(result.data).toEqual(mockData);
  });

  it('performs POST request', async () => {
    const mockData = { id: '1', name: 'Created' };
    (axiosService as any).axiosInstance.post.mockResolvedValue({
      data: mockData,
    });

    const result = await axiosService.post<typeof mockData>('/test', {
      name: 'test',
    });
    expect(result.data).toEqual(mockData);
  });

  it('performs PUT request', async () => {
    const mockData = { id: '1', name: 'Updated' };
    (axiosService as any).axiosInstance.put.mockResolvedValue({
      data: mockData,
    });

    const result = await axiosService.put<typeof mockData>('/test/1', {
      name: 'updated',
    });
    expect(result.data).toEqual(mockData);
  });

  it('performs DELETE request', async () => {
    (axiosService as any).axiosInstance.delete.mockResolvedValue({
      data: true,
    });

    const result = await axiosService.delete<boolean>('/test/1');
    expect(result.data).toBe(true);
  });
});
