import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SidBar from '../components/SidBar';

describe('SidBar component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <SidBar />
            </MemoryRouter>
        );
    });

    // meentime i dont know how to check navigation
    // it('navigates to the correct route when clicking on menu items', () => {
    //     const { getByRole } = render(
    //         <MemoryRouter>
    //             <SidBar />
    //         </MemoryRouter>
    //     );

    //     const menuButton = getByRole('button', { name: 'Open menu' }); // Adjust the name based on your actual button text
    //     fireEvent.click(menuButton);

    //     const allBannersItem = getByRole('button', { name: 'All banners' });
    //     const myBannersItem = getByRole('button', { name: 'My bannars' });
    //     const addBannerItem = getByRole('button', { name: 'Add banner' });

    //     fireEvent.click(allBannersItem);
    //     expect(window.location.pathname).toBe('/banners');

    //     fireEvent.click(myBannersItem);
    //     expect(window.location.pathname).toBe(`/banners/user/${localStorage.getItem('name')}`);

    //     fireEvent.click(addBannerItem);
    //     expect(window.location.pathname).toBe('/createBanner');
    // });
});
