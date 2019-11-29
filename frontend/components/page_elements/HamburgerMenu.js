import styled from 'styled-components';
import { Utilities } from '../../lib/Utilities';

const HamburgerContainer = styled.div`
    display: none;
    margin-left: 10px;
    margin-top: 5px;
    margin-right: 10px;
    .container {
        cursor: pointer;

        .bar1,
        .bar2,
        .bar3 {
            width: 35px;
            height: 5px;
            background-color: #fff;
            margin: 6px 0;
            transition: 0.4s;
        }
    }

    .change .bar1 {
        -webkit-transform: rotate(-45deg) translate(-9px, 6px);
        transform: rotate(-45deg) translate(-9px, 6px);
    }

    .change .bar2 {
        opacity: 0;
    }

    .change .bar3 {
        -webkit-transform: rotate(45deg) translate(-10px, -6px);
        transform: rotate(45deg) translate(-10px, -6px);
    }

    @media all and (max-width: 800px) {
        display: inline-block;
        float: left;
    }
`;

const HamburgerMenu = () => {
    return (
        <HamburgerContainer>
            <div
                className="container"
                id="hamburgermenu"
                role="button"
                tabIndex="0"
                onClick={e => {
                    e.preventDefault();
                    Utilities.toggleMobileMenu();
                }}
                onKeyDown={e => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        Utilities.toggleMobileMenu();
                    }
                }}
            >
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
            </div>
        </HamburgerContainer>
    );
};

export { HamburgerMenu };
