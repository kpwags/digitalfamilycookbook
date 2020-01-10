import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedThemeProvider } from '../../lib/TestUtilities';
import { AdminLayout } from './AdminLayout';

describe('<AdminLayout/>', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AdminLayout>
                    <div />
                </AdminLayout>
            </MockedThemeProvider>
        );

        expect(toJson(wrapper.find('div[data-test="admin-layout"]'))).toMatchSnapshot();
    });
});
