import styled from 'styled-components';
import Link from 'next/link';
import { siteTitle } from '../../config';

const SiteFooter = styled.footer`
    font-size: 0.8rem;
    padding: 20px;
    margin: 0 70px;

    div {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    ul {
        text-align: right;
        margin: 0;

        li {
            list-style-type: none;
            display: inline;
            padding: 0 12px;
        }
    }

    @media all and (max-width: 767px) {
        margin: 0;
        div {
            grid-template-columns: 1fr 1fr;
        }
    }
`;

const Footer = () => {
    return (
        <SiteFooter>
            <div>
                <em>&copy; {siteTitle}</em>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com/kpwags/digitalfamilycookbook">GitHub</a>
                    </li>
                </ul>
            </div>
        </SiteFooter>
    );
};

export { Footer };
