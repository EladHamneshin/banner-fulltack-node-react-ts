import { render, screen } from '@testing-library/react';
import Circular from '../components/Circular';

describe('Circular component', () => {
  test('renders loading text correctly', () => {
    render(<Circular />);
    
    expect(screen.getByText('Loding.....')).toBeInTheDocument();
  });

});
