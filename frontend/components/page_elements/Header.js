import Link from 'next/link';
import styled from 'styled-components';
import { siteTitle } from '../../config';
import NavBar from './NavBar';
import UserHeaderMenu from './UserHeaderMenu';

const StyledHeader = styled.header`
    margin: 0px;
    padding: 0px;
    height: 50px;
    line-height: 50px;
    background-image: -ms-linear-gradient(top, #43ab5e 0%, #00802b 100%);
    background-image: -moz-linear-gradient(top, #43ab5e 0%, #00802b 100%);
    background-image: -o-linear-gradient(top, #43ab5e 0%, #00802b 100%);
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #43ab5e), color-stop(100, #00802b));
    background-image: -webkit-linear-gradient(top, #43ab5e 0%, #00802b 100%);
    background-image: linear-gradient(to bottom, #43ab5e 0%, #00802b 100%);
`;

const Logo = styled.h1`
    font-size: 20px;
    margin: 0 0 0 15px;
    padding: 0;
    line-height: 50px;
    float: left;
    a {
        color: #ffffff;
    }
`;

const Header = () => (
    <StyledHeader>
        <Logo>
            <Link href="/">
                <a>{siteTitle}</a>
            </Link>
        </Logo>
        <NavBar />
        <UserHeaderMenu />
    </StyledHeader>
);

export default Header;