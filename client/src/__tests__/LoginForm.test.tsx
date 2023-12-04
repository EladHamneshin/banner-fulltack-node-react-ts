import { render, screen } from '@testing-library/react';
import LoginForm from '../components/loginANDregister/LoginForm';

vi.mock('../../api/users/loginFetch', () => ({
  loginFetch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('LoginForm component', () => {
  test('renders form correctly', () => {
    render(<LoginForm />);
    
    // Check if form elements are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'sign in' })).toBeInTheDocument();
  });
});
