import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';

const CategoriesMobileNav = () => {
    const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <>
            <li className="title bordered">
                <i className="arrow down" />
                Categories
            </li>

            {data.categories.length > 0 ? (
                data.categories.map(category => (
                    <li key={category.id}>
                        <Link href={`/category?id=${category.id}`}>
                            <a>{category.name}</a>
                        </Link>
                    </li>
                ))
            ) : (
                <li>
                    <em>No Categories Defined</em>
                </li>
            )}
        </>
    );
};

export { CategoriesMobileNav };
