/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import { MainApp } from '../components/MainApp/MainApp';

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
                <MainApp>
                    <Component {...pageProps} />
                </MainApp>
            </ApolloProvider>
        );
    }
}

export default withData(DigitalFamilyCookbook);
