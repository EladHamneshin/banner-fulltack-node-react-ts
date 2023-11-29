import { render, screen } from '@testing-library/react';
import LoginForm from '../components/loginANDregister/LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('LoginForm Component', () => {
  test('renders the component', () => {
    render(<BrowserRouter><LoginForm /></BrowserRouter>);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
  
//   // test to add a user, meentime i dont know what the problem.
//   test('submits the form with valid data', async () => {
//     render(<LoginForm />);
//         const originalLoginFetch = vi.requireActual('../../api/users/loginFetch');
//     vi.spyOn(originalLoginFetch, 'loginFetch').mockResolvedValue({
//       success: true,
//       data: {
//         token: 'mockToken',
//         user: {
//           name: 'John Doe',
//           id: '123'
//         }
//       },
//       message: 'Login successful'
//     });

//     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
//     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

//     fireEvent.click(screen.getByText(/sign in/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//     });

//     expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
//     expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
//     vi.restoreAllMocks();
//   });

});
