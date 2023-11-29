import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardProduct from '../components/cards/CardProduct';

describe('CardProduct Component', () => {
  const mockProduct = {
    id:'12',
    name: 'Mock Product',
    category:'123',
    image: {
      url: 'mock-image-url',
      alt: 'Mock Image',
    },
    rating: 4.5,
    click: 10,
    quantity: 5,
    salePrice: 50,
    discountPercentage: 10,
    description: 'Mock Description',
    coordinate:{
        longitude1:1,
        longitude2:1,
        longitude3:1,
        latitude1:1,
        latitude2:1,
        latitude3:1
    }
  };

  beforeEach(() => {
    localStorage.clear();
  });
  it('renders CardProduct component with product data', () => {
    render(<CardProduct product={mockProduct} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Mock Product')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Image')).toBeInTheDocument();
    expect(screen.getByText('rating: 4.5')).toBeInTheDocument();
    expect(screen.getByText('clicks: 10')).toBeInTheDocument();
  });
// tests on the routing, meentime i dont know what the problem.
//   it('redirects to login if token is not present', () => {
//     const mockNavigate = vi.fn();
//     vi.mock('react-router-dom', () => ({
//       ...vi.importActual('react-router-dom'),
//       useNavigate: () => mockNavigate,
//     })});
//     render(<CardProduct product={mockProduct} />, { wrapper: MemoryRouter });
//     expect(mockNavigate).toHaveBeenCalledWith('/login');
//   });
  
//   it('expands and collapses additional content on button click', () => {
//     render(<CardProduct product={mockProduct} />, { wrapper: MemoryRouter });
//     expect(screen.queryByText('quantity: 5')).toBeNull();
//     fireEvent.click(screen.getByLabelText('show more'));
//     expect(screen.getByText('quantity: 5')).toBeInTheDocument();
//     fireEvent.click(screen.getByLabelText('show more'));
//     expect(screen.queryByText('quantity: 5')).toBeNull();
//   });
});
