import { render, screen } from '@testing-library/react';
import NewBannerForm from '../components/creatBanner/NewBannerHeder';
import { BrowserRouter } from 'react-router-dom';


// Mocking the createBanner and uploadImageToServer functions
vi.mock('createNewBanner', () => ({
  createBanner: vi.fn(),
}));

vi.mock('uploadImage', () => ({
  uploadImageToServer: vi.fn(),
}));



describe('NewBannerForm component', () => {
  const product = {
    id: '1',
    salePrice:45,
    rating:4,
    quantity:78,
    description:'description',
    click:78,
    discountPercentage:45,
    name: 'Test Product',
    category: 'Test Category', image:{
        url:'6786876',
        alt:'hgghghg'
    },
    coordinate:{
        longitude1:323,
        longitude2:323,
        longitude3:323,
        latitude1:45,
        latitude3:45,
        latitude2:45,
    }
  };

  test('renders form and product details correctly', () => {
    render (<BrowserRouter>
        <NewBannerForm product={product} />
        </BrowserRouter>);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

});
