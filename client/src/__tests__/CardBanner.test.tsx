import { render } from '@testing-library/react';
import CardBanner from '../components/cards/CardBanner';

vi.mock('../../api/banners/deleteByBannerID', () => ({
  deleteByBannerID: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../api/banners/toast', () => ({
  toastSuccess: vi.fn(),
}));

describe('CardBanner component', () => {
  test('renders without crashing', () => {
    const banner = {
      _id: '1',
      name: 'Test Banner',
      clickCount: 0,
      image: { url: 'test.jpg', alt: 'Test Alt' },
      size: 'side',
      kind: ['promition'],
      text: 'Special Offer',
      author: 'John Doe',
      productID: '123',
      catogryID: '45',
      createdAt: 'new Date',
      __v: 98
    };

    const { getByText, getByAltText } = render(<CardBanner banner={banner} />);

    expect(getByText('Test Banner')).toBeInTheDocument();
    expect(getByAltText('Test Alt')).toBeInTheDocument();
  });

});
