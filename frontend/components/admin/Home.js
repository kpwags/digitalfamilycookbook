import Link from 'next/link';

const Home = () => (
    <>
        <h1>Manage Site</h1>
        <ul>
            <li>
                <Link href="/admin/invitation-codes">
                    <a>Manage Invitation Codes</a>
                </Link>
            </li>
            <li>
                <Link href="/admin/users">
                    <a>Manage Family Members</a>
                </Link>
            </li>
            <li>
                <Link href="/admin/categories">
                    <a>Manage Categories</a>
                </Link>
            </li>
            <li>
                <Link href="/admin/meats">
                    <a>Manage Meats</a>
                </Link>
            </li>
            <li>
                <Link href="/admin/recipes">
                    <a>Manage Recipes</a>
                </Link>
            </li>
        </ul>
    </>
);

export { Home };
