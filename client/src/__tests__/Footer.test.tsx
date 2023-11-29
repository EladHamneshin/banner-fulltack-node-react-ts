import { render } from '@testing-library/react';
import Footer from '../components/Header-Footer/Footer';

describe('Footer component', () => {
  test('renders footer with correct content', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Banners Website Footer.')).toBeInTheDocument();
    const linkElement = getByText('Banners Website');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
