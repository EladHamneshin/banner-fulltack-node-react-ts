// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import { MemoryRouter } from 'react-router-dom'; // to wrap the component with MemoryRouter
import CardBanner from '../components/cards/CardBanner'; 

// Mock the API function
vi.mock('../../api/banners/deleteByBannerID', () => ({
  deleteByBannerID: vi.fn(),
}));

describe('CardBanner Component', () => {
  const mockBanner = {
    _id: '1',
    name: 'Mock Banner',
    clickCount: 5,
    image: {
      url: 'mock-image-url',
      alt: 'Mock Image',
    },
    size: 'Mock Size',
    kind: 'Mock Kind',
    text: 'Mock Text',
    author: 'Mock Author',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders CardBanner component with banner data', () => {
    render(<CardBanner banner={mockBanner} />, { wrapper: MemoryRouter });

    // Replace 'screen.getBy...' with the appropriate queries for your UI structure
    expect(screen.getByText('Mock Banner')).toBeInTheDocument();
    expect(screen.getByText('clicks: 5')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Image')).toBeInTheDocument();
  });

  it('redirects to login if token is not present', () => {
    // Mock useNavigate
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
      ...vi.importActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<CardBanner banner={mockBanner} />, { wrapper: MemoryRouter });

    // Ensure useNavigate has been called with the login route
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('calls deleteBanner function on delete button click', async () => {
    // Mock localStorage
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('mock-token');

    // Mock useNavigate
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(<CardBanner banner={mockBanner} />, { wrapper: MemoryRouter });

    // Mock the API response
    deleteByBannerID.mockResolvedValueOnce({ message: 'Banner deleted successfully' });

    // Click the delete button
    fireEvent.click(screen.getByLabelText('delete'));

    // Wait for the API call to finish
    await waitFor(() => {
      // Ensure the deleteByBannerID function is called with the correct banner ID
      expect(deleteByBannerID).toHaveBeenCalledWith('1');
      // Ensure the loading message is displayed
      expect(screen.getByText('Loading.....')).toBeInTheDocument();
      // Ensure the success message is displayed after a delay
      expect(screen.getByText('Banner deleted successfully')).toBeInTheDocument();
    });
  });

});
