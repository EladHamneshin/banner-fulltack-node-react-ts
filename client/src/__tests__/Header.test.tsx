// import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header-Footer/Header';
import { JSX } from 'react/jsx-runtime';


function mount(arg0: JSX.Element) {
    throw new Error(`Function not implemented. argument:${arg0}`);
}

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

//   it('clicking home icon navigates to the correct page', () => {
//     const originalUseNavigate = require('react-router-dom').useNavigate;
//     const navigateMock = vi.fn();
//     require('react-router-dom').useNavigate = () => navigateMock;
//     mount(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );
//     // Find the home icon in the rendered component
//     const homeIcon = screen.getByLabelText(/home/i);
//     fireEvent.click(homeIcon);
//     // Expect that the navigateMock function was called with '/'
//     expect(navigateMock).toHaveBeenCalledWith('/');
//     // Restore the original useNavigate
//     require('react-router-dom').useNavigate = originalUseNavigate;
//   });
});
