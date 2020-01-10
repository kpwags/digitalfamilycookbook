import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { CREATE_MEAT_MUTATION } from '../../mutations/Meat';
import { TestMeat, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddMeat } from './AddMeat';

describe('<AddMeat/>', () => {
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
                <AddMeat />
            </MockedThemeProvider>
        );

        const form = wrapper.find('form[data-test="form"]');
        expect(toJSON(form)).toMatchSnapshot();
    });

    it('updates the state', async () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AddMeat />
            </MockedThemeProvider>,
            { attachTo: document.getElementById('container') }
        );

        wrapper.find('input[name="name"]').simulate('change', { target: { value: 'test meat', name: 'name' } });

        expect(wrapper.find('AddMeat').instance().state).toMatchObject({
            name: 'test meat',
            error: null
        });
    });

    it('creates a category when the form is submitted', async () => {
        const meat = TestMeat();
        const mocks = [
            {
                request: {
                    query: CREATE_MEAT_MUTATION,
                    variables: {
                        name: meat.name
                    }
                },
                result: {
                    data: {
                        createCategory: {
                            ...TestMeat,
                            id: 'abc123',
                            __typename: 'Category'
                        }
                    }
                }
            }
        ];

        const wrapper = mount(
            <MockedThemeProvider mocks={mocks}>
                <AddMeat />
            </MockedThemeProvider>,
            { attachTo: document.getElementById('container') }
        );

        act(() => {
            wrapper.find('input[name="name"]').simulate('change', { target: { value: meat.name, name: 'name' } });
            wrapper.find('form#create-meat-form').simulate('submit');
        });

        await wait(50);

        expect(wrapper.find('AddMeat').instance().state.error).toEqual(null);
    });
});
