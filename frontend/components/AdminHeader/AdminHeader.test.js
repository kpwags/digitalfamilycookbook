import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedThemeProvider } from '../../lib/TestUtilities';
import { AdminHeader } from './AdminHeader';

describe('<AdminHeader/>', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AdminHeader title="Testing Admin Header" />
            </MockedThemeProvider>
        );

        expect(toJson(wrapper.find('div#admin-header'))).toMatchSnapshot();
    });
});
