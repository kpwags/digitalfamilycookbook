import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddCategory } from './AddCategory';

describe('<AddCategory/>', () => {
    beforeEach(() => {
        // Avoid `attachTo: document.body` Warning
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
    });

    afterEach(() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
    });

    it('should match snapshot', () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AddCategory />
            </MockedThemeProvider>
        );

        const form = wrapper.find('form[data-test="form"]');
        expect(toJSON(form)).toMatchSnapshot();
    });

    it('updates the state', async () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AddCategory />
            </MockedThemeProvider>,
            { attachTo: document.getElementById('container') }
        );

        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'test category', name: 'name' } });

        expect(wrapper.find('AddCategory').instance().state).toMatchObject({
            name: 'test category',
            error: null
        });
    });

    it('creates a category when the form is submitted', async () => {
        const category = TestCategory();
        const mocks = [
            {
                request: {
                    query: CREATE_CATEGORY_MUTATION,
                    variables: {
                        name: category.name
                    }
                },
                result: {
                    data: {
                        createCategory: {
                            ...TestCategory,
                            id: 'abc123',
                            __typename: 'Category'
                        }
                    }
                }
            }
        ];

        const wrapper = mount(
            <MockedThemeProvider mocks={mocks}>
                <AddCategory />
            </MockedThemeProvider>,
            { attachTo: document.getElementById('container') }
        );

        act(() => {
            wrapper.find('input[name="name"]').simulate('change', { target: { value: category.name, name: 'name' } });
            wrapper.find('form#create-category-form').simulate('submit');
        });

        await wait(50);

        expect(wrapper.find('AddCategory').instance().state.error).toEqual(null);
    });
});
