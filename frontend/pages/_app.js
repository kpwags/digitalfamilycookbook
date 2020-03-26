/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Page } from '../components/Page/Page';
import { Overlay } from '../components/Overlay/Overlay';
import withData from '../lib/withData';
import { AppContext } from '../components/AppContext/AppContext';

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

    state = {
        overlayVisible: false
    };

    toggleOverlay = () => {
        if (this.state.overlayVisible) {
            this.setState({
                overlayVisible: false
            });
        } else {
            this.setState({
                overlayVisible: true
            });
        }
    };

    render() {
        const { Component, apollo, pageProps } = this.props;

        return (
            <ApolloProvider client={apollo}>
                <AppContext.Provider
                    value={{ overlayVisible: this.state.overlayVisible, toggleOverlay: this.toggleOverlay }}
                >
                    <Overlay id="page-overlay" open={this.state.overlayVisible} />
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </AppContext.Provider>
            </ApolloProvider>
        );
    }
}

export default withData(DigitalFamilyCookbook);
