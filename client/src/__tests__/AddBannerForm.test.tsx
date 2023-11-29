import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import AddBannerForm from '../components/creatBanner/AddBannerForm';

// Mock the functions passed as props
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
    expect(screen.getByLabelText(/Select size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select kind/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

//   it('submits the form with valid data', async () => {
//     setup();

//     // Fill in form fields
//     userEvent.type(screen.getByLabelText(/Name/i), 'Test Name');
//     userEvent.type(screen.getByLabelText(/Discription/i), 'Test Description');
//     userEvent.selectOptions(screen.getByLabelText(/Select size/i), 'side');
//     userEvent.selectOptions(screen.getByLabelText(/Select kind/i), 'price');

//     // Create a file to simulate uploading an image
//     const file = new File(['test image content'], 'test-image.jpg', { type: 'image/jpeg' });
//     fireEvent.change(screen.getByLabelText(/Image/i), { target: { files: [file] } });

//     // Submit the form
//     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

//     // Wait for asynchronous actions to complete
//     await waitFor(() => {
//       expect(mockUploadImage).toHaveBeenCalledWith(file, 'Test Name', 'side');
//       expect(mockOnSubmitForm).toHaveBeenCalledWith({
//         name: 'Test Name',
//         text: 'Test Description',
//         size: 'side',
//         kind: 'price',
//         image: [file],
//       });
//     });
//   });
});
