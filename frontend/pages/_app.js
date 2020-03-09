/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import App from 'next/app';
import { adopt } from 'react-adopt';
import { ApolloProvider, Query } from 'react-apollo';
import { Page } from '../components/Page/Page';
import { Overlay } from '../components/Overlay/Overlay';
import withData from '../lib/withData';
import { LOCAL_STATE_QUERY } from '../queries/Local';

class DigitalFamilyCookbook extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // this exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps };
    }

    render() {
        const { Component, apollo, pageProps } = this.props;

        const Composed = adopt({
            localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
        });

        return (
            <ApolloProvider client={apollo}>
                <Composed>
                    {({ localState }) => {
                        let overlayVisible = false;
                        if (typeof localState.data !== 'undefined') {
                            ({ overlayVisible } = localState.data);
                        }
                        return <Overlay id="page-overlay" open={overlayVisible} />;
                    }}
                </Composed>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        );
    }
}

export default withData(DigitalFamilyCookbook);
