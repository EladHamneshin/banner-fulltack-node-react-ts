import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header-Footer/Header';
// import userEvent from '@testing-library/user-event';

// const handleClickHomePage = vi.fn();

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
// tests on the routing, meentime i dont know what the problem.
    // it("button is clicked using userEvent", async () => {
    // const user = userEvent.setup()
    // render(<BrowserRouter><Header /></BrowserRouter>)
    // const buttonElement = screen.getByRole("button")
    // await user.click(buttonElement);
    // expect(handleClickHomePage).toHaveBeenCalled()
    // })
})