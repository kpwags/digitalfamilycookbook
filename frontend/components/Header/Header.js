import Link from 'next/link';
import styled from 'styled-components';
import { siteTitle } from '../../config';
import { NavBar } from '../NavBar/NavBar';
import { UserHeaderMenu } from '../UserHeaderMenu/UserHeaderMenu';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';

const StyledHeader = styled.header`
    margin: 0px;
    padding: 0px;
    height: 50px;
    line-height: 50px;
    background-image: -ms-linear-gradient(top, ${(props) => props.theme.lightGreen} 0%, ${(props) => props.theme.green} 100%);
    background-image: -moz-linear-gradient(top, ${(props) => props.theme.lightGreen} 0%, ${(props) => props.theme.green} 100%);
    background-image: -o-linear-gradient(top, ${(props) => props.theme.lightGreen} 0%, ${(props) => props.theme.green} 100%);
    background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0, ${(props) => props.theme.lightGreen}),
        color-stop(100, ${(props) => props.theme.green})
    );
    background-image: -webkit-linear-gradient(top, ${(props) => props.theme.lightGreen} 0%, ${(props) => props.theme.green} 100%);
    background-image: linear-gradient(to bottom, ${(props) => props.theme.lightGreen} 0%, ${(props) => props.theme.green} 100%);

    @media print {
        display: none;
    }

    @media all and (max-width: 800px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
    }
`;

const Logo = styled.h1`
    font-size: 20px;
    margin: 0 0 0 15px;
    padding: 0;
    line-height: 50px;
    float: left;

    a {
        color: hsl(0, 0%, 100%);
    }

    a:hover {
        text-decoration: none;
    }

    @media all and (max-width: 800px) {
        float: none;
    }
`;

const Header = () => (
    <StyledHeader>
        <HamburgerMenu />
        <Logo>
            <Link href="/">
                <a>{siteTitle}</a>
            </Link>
        </Logo>
        <NavBar />
        <UserHeaderMenu />
    </StyledHeader>
);

export { Header };
