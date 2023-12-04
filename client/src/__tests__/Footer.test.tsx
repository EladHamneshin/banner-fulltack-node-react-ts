import { render, screen } from '@testing-library/react';
import Footer from '../components/Header-Footer/Footer';

describe('Footer component', () => {
  test('renders footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Banners Website Footer.')).toBeInTheDocument();
  });
});