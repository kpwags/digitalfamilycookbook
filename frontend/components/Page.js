import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import Meta from './page_elements/Meta';
import Header from './page_elements/Header';

const theme = {
    black: '#393939',
    green: 'hsl(140, 100%, 25%)',
    lightGreen: 'hsl(136, 44%, 47%)',
    paleGreen: 'hsl(136, 100%, 88%)',
    darkGreen: 'hsl(140, 100%, 15%)',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
    font-family: 'Helvetica-Neue', Arial, Helvetica, sans-serif
  }
  *, *:before, *:after {
    box-sizing:inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration:none;
    cursor:pointer;
    color: ${theme.black};
  }
`;

class Page extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    <Inner>{this.props.children}</Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;
