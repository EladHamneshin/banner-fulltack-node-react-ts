import { render, screen } from '@testing-library/react';
import AddBannerForm from '../components/creatBanner/AddBannerForm';

const mockUploadImage = vi.fn();
const mockOnSubmitForm = vi.fn();

const mockProduct = {
    id:'67',
    name: 'Mock Product',
    category: 'Mock Category',
    salePrice:45,
    quantity:45,
    description:'hfgydtfrty',
    discountPercentage:78,
    rating:4,
    click:454,
    image:{
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

const setup = () => {
  render(
    <AddBannerForm
      product={mockProduct}
      uploadImage={mockUploadImage}
      onSubmitForm={mockOnSubmitForm}
    />
  );
};

describe('AddBannerForm', () => {
  it('renders the form', () => {
    setup();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discription/i)).toBeInTheDocument();
    const selectElement = screen.getByRole('checbox', { 'name':'size' });
    expect(selectElement).toBeInTheDocument();
    // expect(screen.getByRole()).toBeInTheDocument();
    // expect(screen.getByRole(/kind/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});