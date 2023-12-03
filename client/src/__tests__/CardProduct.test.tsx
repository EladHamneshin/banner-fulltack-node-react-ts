import { render } from '@testing-library/react';
import CardProduct from '../components/cards/CardProduct';

describe('CardProduct component', () => {
  const product = {
    id:'hugh',
    quantity:45496,
    rating:4,
    click:9,
    category:'food',
    coordinate:{
        longitude1: 4545,
        longitude2: 4545,
        longitude3: 4545,
        latitude1: 4545,
        latitude2: 4545,
        latitude3: 4545
    },
    name: 'Test Product',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: { url: 'test.jpg', alt: 'Test Alt' },
    salePrice: 19.99,
    discountPercentage: 10,
  };

  test('renders product details correctly', () => {
    const { getByText, getByAltText } = render(<CardProduct product={product} />);
    
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
    expect(getByAltText('Test Alt')).toBeInTheDocument();
    expect(getByText('$19.99')).toBeInTheDocument();
    expect(getByText('10% off')).toBeInTheDocument();
  });

  test('does not render discount if discountPercentage is 0', () => {
    const productWithoutDiscount = {
      ...product,
      discountPercentage: 0,
    };

    const { queryByText } = render(<CardProduct product={productWithoutDiscount} />);
    
    expect(queryByText('0% off')).toBeNull();
  });

});
