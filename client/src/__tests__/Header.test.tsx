// import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header-Footer/Header';

describe('Header component', () => {
    it('renders username correctly', () => {      
    localStorage.setItem('name', 'John Doe');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const usernameElement = screen.getByText(/Hello John Doe/i);
    expect(usernameElement).toBeInTheDocument();
  });

  it('renders default username when localStorage is empty', () => {
    localStorage.removeItem('name');
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const defaultUsernameElement = screen.getByText(/Hello User/i);
    expect(defaultUsernameElement).toBeInTheDocument();
  });
 
});
