import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { CREATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { TestInvitationCode } from '../../lib/TestUtilities';
import { Theme } from '../../lib/Theme';
import { AddInvitationCode } from './AddInvitationCode';

describe('<AddInvitationCode/>', () => {
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
            <ThemeProvider theme={Theme}>
                <MockedProvider>
                    <AddInvitationCode />
                </MockedProvider>
            </ThemeProvider>
        );

        const form = wrapper.find('form[data-test="form"]');
        expect(toJSON(form)).toMatchSnapshot();
    });

    // it('updates the state', async () => {
    //     const wrapper = mount(
    //         <ThemeProvider theme={Theme}>
    //             <MockedProvider>
    //                 <AddInvitationCode />
    //             </MockedProvider>
    //         </ThemeProvider>,
    //         { attachTo: document.getElementById('container') }
    //     );

    //     wrapper.find('input[name="code"]').simulate('change', { target: { value: 'test code', name: 'code' } });

    //     await wait(100);

    //     expect(wrapper.find('AddInvitationCode').instance().state).toMatchObject({
    //         code: 'test code',
    //         error: null
    //     });
    // });

    it('creates an invitation code when the form is submitted', async () => {
        const invitationCode = TestInvitationCode();
        const mocks = [
            {
                request: {
                    query: CREATE_INVITATION_CODE_MUTATION,
                    variables: {
                        name: invitationCode.code
                    }
                },
                result: {
                    data: {
                        createCategory: {
                            ...TestInvitationCode,
                            id: 'abc123',
                            __typename: 'InvitationCode'
                        }
                    }
                }
            }
        ];

        const wrapper = mount(
            <ThemeProvider theme={Theme}>
                <MockedProvider mocks={mocks}>
                    <AddInvitationCode />
                </MockedProvider>
            </ThemeProvider>,
            { attachTo: document.getElementById('container') }
        );

        act(() => {
            wrapper
                .find('input[name="code"]')
                .simulate('change', { target: { value: invitationCode.code, name: 'code' } });
            wrapper.find('form#create-invitation-code-form').simulate('submit');
        });

        await wait(50);

        expect(wrapper.find('AddInvitationCode').instance().state.error).toEqual(null);
    });
});
