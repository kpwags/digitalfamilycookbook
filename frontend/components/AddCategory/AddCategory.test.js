import { render, screen, wait, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddCategory } from './AddCategory';

describe('<AddCategory/>', () => {
    // beforeEach(() => {
    //     // Avoid `attachTo: document.body` Warning
    //     const div = document.createElement('div');
    //     div.setAttribute('id', 'container');
    //     document.body.appendChild(div);
    // });

    // afterEach(() => {
    //     const div = document.getElementById('container');
    //     if (div) {
    //         document.body.removeChild(div);
    //     }
    // });

    // it('should match snapshot', () => {
    //     const wrapper = mount(
    //         <MockedThemeProvider>
    //             <AddCategory />
    //         </MockedThemeProvider>
    //     );

    //     const form = wrapper.find('form[data-test="form"]');
    //     expect(toJSON(form)).toMatchSnapshot();
    // });

    // it('updates the state', async () => {
    //     const wrapper = mount(
    //         <MockedThemeProvider>
    //             <AddCategory />
    //         </MockedThemeProvider>,
    //         { attachTo: document.getElementById('container') }
    //     );

    //     wrapper.find('input[name="name"]').simulate('change', { target: { value: 'test category', name: 'name' } });

    //     expect(wrapper.find('AddCategory').instance().state).toMatchObject({
    //         name: 'test category',
    //         error: null
    //     });
    // });

    // it('creates a category when the form is submitted', async () => {

    //     const wrapper = mount(
    //         <MockedThemeProvider mocks={mocks}>
    //             <AddCategory />
    //         </MockedThemeProvider>,
    //         { attachTo: document.getElementById('container') }
    //     );

    //     act(() => {
    //         wrapper.find('input[name="name"]').simulate('change', { target: { value: category.name, name: 'name' } });
    //         wrapper.find('form#create-category-form').simulate('submit');
    //     });

    //     await wait(50);

    //     expect(wrapper.find('AddCategory').instance().state.error).toEqual(null);
    // });

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

    test('it creates a category when the form is submited', async () => {
        render(
            <MockedThemeProvider mocks={mocks}>
                <AddCategory />
            </MockedThemeProvider>
        );

        const categoryInput = screen.getByTestId(/add-category-name/);

        await user.type(categoryInput, category.name);

        const addCategoryButton = screen.getByText(/Save/);

        fireEvent.click(addCategoryButton);

        const addCategoryMutation = mocks[0].createCategory;
        await wait(() => expect(addCategoryMutation).toHaveBeenCalled());
    });
});
