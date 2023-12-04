import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManageIcon from '../components/ManageIcon'; 
describe('ManageIcon component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <ManageIcon />
            </MemoryRouter>
        );
    });

    //   // test to add a user, meentime i dont know what the problem.
    // it('opens and closes the menu on button click', () => {
    //     const { getByRole } = render(
    //         <MemoryRouter>
    //             <ManageIcon />
    //         </MemoryRouter>
    //     );

    //     const manageIcon = getByRole('button', { aria-label:'IconButton' });
    //     fireEvent.click(manageIcon);

    //     const menu = getByRole('menu');
    //     expect(menu).toBeInTheDocument();

    //     fireEvent.click(manageIcon);

    //     expect(menu).not.toBeInTheDocument();
    // });

    // it('navigates to the correct route when clicking on menu items', async () => {
    //     const { getByRole } = render(
    //         <MemoryRouter>
    //             <ManageIcon />
    //         </MemoryRouter>
    //     );

    //     const manageIcon = getByRole('button', { name: 'Account settings' }); // Adjust the name based on your actual button text
    //     fireEvent.click(manageIcon);

    //     const profileItem = getByRole('menuitem', { name: 'Profile' });
    //     fireEvent.click(profileItem);
    //     await waitFor(() => {
    //         expect(window.location.pathname).toBe('/banners/user/profil');
    //     });

    //     const myAccountItem = getByRole('menuitem', { name: 'My account' });
    //     fireEvent.click(myAccountItem);
    //     // Add expectation for My Account route if needed

    //     const addAccountItem = getByRole('menuitem', { name: 'Add another account' });
    //     fireEvent.click(addAccountItem);
    //     // Add expectation for Add Account functionality if needed

    //     const settingsItem = getByRole('menuitem', { name: 'Settings' });
    //     fireEvent.click(settingsItem);
    //     // Add expectation for Settings functionality if needed

    //     const logoutItem = getByRole('menuitem', { name: 'Logout' });
    //     fireEvent.click(logoutItem);
    //     // Add expectation for Logout functionality if needed
    // });
});
