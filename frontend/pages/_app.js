import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Page } from '../components/Page/Page';
import { Overlay } from '../components/Overlay/Overlay';
import withData from '../lib/withData';

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

        return (
            <ApolloProvider client={apollo}>
                <Overlay id="page-overlay" />
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        );
    }
}

export default withData(DigitalFamilyCookbook);
