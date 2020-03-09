import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../queries/Local';

function createClient({ headers }) {
    return new ApolloClient({
        uri: endpoint,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include'
                },
                headers
            });
        },
        // local data
        clientState: {
            resolvers: {
                Mutation: {
                    toggleOverlay(_, variables, { cache }) {
                        const { overlayVisible } = cache.readQuery({
                            query: LOCAL_STATE_QUERY
                        });

                        const data = {
                            data: {
                                overlayVisible: !overlayVisible
                            }
                        };

                        cache.writeData(data);

                        return data;
                    }
                }
            },
            defaults: {
                overlayVisible: false
            }
        }
    });
}

export default withApollo(createClient);
