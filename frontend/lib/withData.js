import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
    return new ApolloClient({
        uri: endpoint,
        request: (operation) => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            });
        },
        // local data
        clientState: {
            resolvers: {
                Mutation: {},
            },
        },
    });
}

export default withApollo(createClient);
