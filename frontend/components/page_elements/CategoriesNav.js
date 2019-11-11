import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { DownArrow } from '../svg/DownArrow';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';

const CategoriesNav = () => {
    const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <Link href="/">
                <a>
                    Categories <DownArrow width={15} height={15} fill="#fff" viewbox="0 0 129 129" />
                </a>
            </Link>

            <ul className="child-list">
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
            </ul>
        </li>
    );
};

export { CategoriesNav };
