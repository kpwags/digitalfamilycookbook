import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedThemeProvider } from '../../lib/TestUtilities';
import { AddButton } from './AddButton';

describe('<AddButton/>', () => {
    it('should match snapshot', () => {
        const wrapper = mount(
            <MockedThemeProvider>
                <AddButton />
            </MockedThemeProvider>
        );

        expect(toJson(wrapper.find('button'))).toMatchSnapshot();
    });
});
