import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { UPDATE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestMeat, MockedThemeProvider } from '../../lib/TestUtilities';
import { EditMeat } from './EditMeat';

describe('<EditMeat/>', () => {
    const meat = TestMeat();
    const newMeat = TestMeat();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
    const updateMeatMutationHandler = jest.fn().mockResolvedValue({
        data: {
            updateMeat: {
                id: meat.id,
                name: meat.name,
            },
        },
    });

    const allMeatsQueryHandler = jest.fn().mockResolvedValue({
        data: {
            meats: [TestMeat(), TestMeat(), TestMeat()],
        },
    });

    mockClient.setRequestHandler(UPDATE_MEAT_MUTATION, updateMeatMutationHandler);
    mockClient.setRequestHandler(ALL_MEATS_QUERY, allMeatsQueryHandler);

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider>
                <EditMeat id={meat.id} name={meat.name} />
            </MockedThemeProvider>
        );

        const meatNameInput = getByLabelText(/Name/);

        expect(meatNameInput.value).toBe(meat.name);
    });

    test('it updates a category when the form is submited', async () => {
        const { getByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <EditMeat id={meat.id} name={meat.name} />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Name/), {
                    target: {
                        value: newMeat.name,
                    },
                });
            });

            fireEvent.click(await getByText(/Save Changes/));
        });

        expect(updateMeatMutationHandler).toBeCalledWith({
            id: meat.id,
            name: newMeat.name,
        });

        expect(allMeatsQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a meat name is required if left blank', async () => {
        const { getByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <EditMeat id={meat.id} name={meat.name} />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Name/), {
                    target: {
                        value: '',
                    },
                });
            });

            await waitFor(async () => {
                fireEvent.blur(await getByLabelText(/Name/));
            });
        });

        // Assert that the error message was displayed
        await waitFor(() => getByText(/Name is required/));
    });
});
