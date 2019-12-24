import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { Utilities } from '../../lib/Utilities';

const CategoriesNav = () => {
    const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <a
                role="button"
                tabIndex="0"
                onClick={e => {
                    e.preventDefault();
                    Utilities.toggleHeaderMenu('categories-header-menu');
                }}
                onKeyDown={e => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        Utilities.toggleHeaderMenu('categories-header-menu');
                    }
                }}
            >
                Categories <i className="arrow down" />
            </a>

            <ul className="child-list" id="categories-header-menu">
                {data.categories.length > 0 ? (
                    data.categories.map(category => (
                        <li key={category.id}>
                            <Link href={`/category?id=${category.id}`}>
                                <a
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        Utilities.hideHeaderMenu('categories-header-menu');
                                    }}
                                    onKeyDown={e => {
                                        if (e.keyCode === 13 || e.keyCode === 32) {
                                            Utilities.hideHeaderMenu('categories-header-menu');
                                        }
                                    }}
                                >
                                    {category.name}
                                </a>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>
                        <em>No Categories Defined</em>
                    </li>
                )}
            </ul>
        </li>
    );
};

export { CategoriesNav };