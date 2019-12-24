import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import { Meta } from '../Meta/Meta';
import { Header } from '../Header/Header';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { ClearFix } from '../ClearFix/ClearFix';

const theme = {
    black: '#393939',
    green: 'hsl(140, 100%, 25%)',
    lightGreen: 'hsl(136, 44%, 47%)',
    paleGreen: 'hsl(136, 100%, 88%)',
    darkGreen: 'hsl(140, 100%, 15%)',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.2)'
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    margin: 15px;

    @media all and (max-width: 800px) {
        margin-top: 75px;
    }
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 100%;
        font-family: 'Helvetica-Neue', Arial, Helvetica, sans-serif
    }
    *, *:before, *:after {
        box-sizing:inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
    }
    h1 {
        font-size:2rem;
        color: ${props => props.theme.green};
    }
    h2 {
        font-size:1.75rem;
    }
    h3 {
        font-size:1.5rem;
    }
    h4 {
        font-size:1.25rem;
    }
    p {
    line-height:1.5;
    margin:1rem 0;
    font-size:1rem;
    }
    a {
    text-decoration:none;
    cursor:pointer;
    color: ${props => props.theme.green};
    }
    a:hover {
        text-decoration: underline;
    }

    i {
        border: solid #fff;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        margin: 0 10px 5px 8px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

    .error { color: #f00; }

    @media all and (max-width: 414px) {
        h1 { font-size: 1.6rem; }
        h2 { font-size: 1.45rem; }
        h3 { font-size: 1.3rem; }
        h4 { font-size: 1.15rem; }
    }
`;

class Page extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <StyledPage>
                    <Meta />
                    <Header />
                    <ClearFix />
                    <MobileMenu />
                    <Inner>{this.props.children}</Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export { Page };
