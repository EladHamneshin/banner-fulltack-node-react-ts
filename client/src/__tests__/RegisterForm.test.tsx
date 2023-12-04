import { render, screen } from '@testing-library/react';
import RegisterForm from '../components/loginANDregister/RegisterForm';
import { BrowserRouter } from 'react-router-dom';


vi.mock('../../api/users/regiterFetch', () => ({
  regiterFetch: vi.fn(),
}));


describe('RegisterForm component', () => {
  test('renders form correctly', () => {
    render(
        <BrowserRouter><RegisterForm /></BrowserRouter>);
    
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'sign up' })).toBeInTheDocument();
  });
});
