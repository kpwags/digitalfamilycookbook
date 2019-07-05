import Link from 'next/link';

const Home = () => (
    <ul>
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
    </ul>
);

export { Home };
