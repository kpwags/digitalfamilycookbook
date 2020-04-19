import { render, wait, fireEvent, act, waitForElement } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CREATE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestMeat, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddMeat } from './AddMeat';

describe('<AddMeat/>', () => {
    const meat = TestMeat();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
    const createMeatMutationHandler = jest.fn().mockResolvedValue({
        data: {
            createMeat: {
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

    mockClient.setRequestHandler(CREATE_MEAT_MUTATION, createMeatMutationHandler);
    mockClient.setRequestHandler(ALL_MEATS_QUERY, allMeatsQueryHandler);

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider>
                <AddMeat />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Name/));
    });

    test('it creates a meat when the form is submited', async () => {
        await act(async () => {
            const { getByText, getByLabelText } = render(
                <ApolloProvider client={mockClient}>
                    <AddMeat />
                </ApolloProvider>
            );

            fireEvent.change(await getByLabelText(/Name/), {
                target: {
                    value: meat.name,
                },
            });

            await wait(async () => fireEvent.click(await getByText(/Save/)));
        });

        expect(createMeatMutationHandler).toBeCalledWith({
            name: meat.name,
        });

        expect(allMeatsQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a meat name is required if left blank', async () => {
        const { getByText } = render(
            <ApolloProvider client={mockClient}>
                <AddMeat />
            </ApolloProvider>
        );

        await wait(async () => fireEvent.click(await getByText(/Save/)));

        // Assert that the error message was displayed
        await waitForElement(() => getByText(/Name is required/));
    });
});
