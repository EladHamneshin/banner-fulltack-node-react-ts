import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../components/loginANDregister/RegisterForm';
// import { regiterFetch } from '../api/users/regiterFetch';

// Mock the API function
vi.mock('../../api/users/regiterFetch', () => ({
  regiterFetch: vi.fn(),
}));

describe('RegisterForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders RegisterForm component', () => {
    render(<RegisterForm />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('sign up')).toBeInTheDocument();
  });

//   it('submits the form and redirects to login on successful registration', async () => {
//     render(<RegisterForm />, { wrapper: MemoryRouter });

//     // // Mock the API response
//     // const mockResponse = { success: true };
//     // const reg = await regiterFetch
//     // reg.mockResolvedValueOnce(mockResponse);

//     // Fill out the form
//     fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
//     fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
//     fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });

//     // Submit the form
//     fireEvent.click(screen.getByText('sign up'));

//     // Wait for the API call to finish
//     await waitFor(() => {
//       // Ensure the regiterFetch function is called with the correct user data
//       expect(regiterFetch).toHaveBeenCalledWith({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'password',
//         isadmin: true,
//       });
//       // Ensure the loading message is displayed
//       expect(screen.getByText('Loading.....')).toBeInTheDocument();
//     });

//     // Ensure the redirect to login is triggered after a successful registration
//     expect(window.location.pathname).toBe('/login');
//   });

});
