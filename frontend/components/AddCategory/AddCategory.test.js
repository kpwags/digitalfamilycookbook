import { render, waitForElement } from '@testing-library/react';
// import { render, screen, wait, fireEvent, waitForElement } from '@testing-library/react';
// import user from '@testing-library/user-event';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddCategory } from './AddCategory';

describe('<AddCategory/>', () => {
    const category = TestCategory();
    const mocks = [
        {
            request: {
                query: CREATE_CATEGORY_MUTATION,
                variables: {
                    name: category.name
                }
            },
            createCategory: jest.fn(() => ({
                data: {
                    createCategory: {
                        id: 'abc123',
                        name: category.name
                    }
                }
            }))
        }
    ];

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <AddCategory />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Name/));
    });

    // TODO: Figure this out
    // test('it creates a category when the form is submited', async () => {
    //     const { getByText, getByLabelText } = render(
    //         <MockedThemeProvider mocks={mocks}>
    //             <AddCategory />
    //         </MockedThemeProvider>
    //     );

    //     const categoryInput = getByLabelText(/Name/);

    //     await user.type(categoryInput, category.name);

    //     const addCategoryButton = getByText(/Save/);

    //     fireEvent.click(addCategoryButton);

    //     const addCategoryMutation = mocks[0].createCategory;
    //     await wait(() => expect(addCategoryMutation).toHaveBeenCalled());
    // });
});
