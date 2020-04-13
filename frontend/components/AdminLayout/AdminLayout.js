import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MobileAlertBox } from '../MobileAlertBox/MobileAlertBox';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;

    @media all and (max-width: 800px) {
        display: block;
    }
`;

const Sidebar = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;

    h3 {
        color: ${(props) => props.theme.darkGreen};
        margin-top: 0;
        padding-top: 0;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
        margin: 0 0 2rem 0;
        font-size: 1.1rem;

        a {
            color: ${(props) => props.theme.green};
        }
    }

    li.active {
        font-weight: bold;
        color: ${(props) => props.theme.darkGreen};
    }

    @media all and (max-width: 800px) {
        display: none;
    }
`;

const Main = styled.div`
    grid-column-start: 2;
    grid-column-end: 2;
`;

const AdminLayout = (props) => {
    return (
        <Layout data-test="admin-layout">
            <Sidebar>
                <h3>Site Administration</h3>
                <ul>
                    <li className={props.activePage === 'invitationcodes' ? 'active' : ''}>
                        {props.activePage === 'invitationcodes' ? (
                            <>Invitation Codes</>
                        ) : (
                            <Link href="/admin/invitation-codes">
                                <a className="gray">Invitation Codes</a>
                            </Link>
                        )}
                    </li>
                    <li className={props.activePage === 'familymembers' ? 'active' : ''}>
                        {props.activePage === 'familymembers' ? (
                            <>Family Members</>
                        ) : (
                            <Link href="/admin/users">
                                <a>Family Members</a>
                            </Link>
                        )}
                    </li>
                    <li className={props.activePage === 'categories' ? 'active' : ''}>
                        {props.activePage === 'categories' ? (
                            <>Categories</>
                        ) : (
                            <Link href="/admin/categories">
                                <a>Categories</a>
                            </Link>
                        )}
                    </li>
                    <li className={props.activePage === 'meats' ? 'active' : ''}>
                        {props.activePage === 'meats' ? (
                            <>Meats</>
                        ) : (
                            <Link href="/admin/meats">
                                <a>Meats</a>
                            </Link>
                        )}
                    </li>
                    <li className={props.activePage === 'recipes' ? 'active' : ''}>
                        {props.activePage === 'recipes' ? (
                            <>Recipes</>
                        ) : (
                            <Link href="/admin/recipes">
                                <a>Recipes</a>
                            </Link>
                        )}
                    </li>
                </ul>
            </Sidebar>
            <Main>
                <MobileAlertBox message="This is best viewed in landscape mode" />
                {props.children}
            </Main>
        </Layout>
    );
};

AdminLayout.propTypes = {
    activePage: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export { AdminLayout };
