import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { Utilities } from '../../lib/Utilities';

const CategoriesMobileNav = () => {
    const [expanded, setExpanded] = useState();

    const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY);

    if (loading || error) return <li />;

    return (
        <>
            <li className="title bordered">
                <a
                    role="button"
                    tabIndex="0"
                    onClick={e => {
                        e.preventDefault();
                        setExpanded(!expanded);
                    }}
                    onKeyDown={e => {
                        e.preventDefault();
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            setExpanded(!expanded);
                        }
                    }}
                >
                    <i id="categories-arrow" className={expanded ? 'arrow down' : 'arrow right'} />
                    Categories
                </a>
            </li>
            <li>
                <ul id="categories" style={expanded ? { display: 'block' } : { display: 'none' }}>
                    {data.categories.length > 0 &&
                        data.categories.map(category => (
                            <li key={category.id}>
                                <Link href={`/category?id=${category.id}`}>
                                    <a
                                        role="button"
                                        tabIndex="0"
                                        onClick={() => {
                                            Utilities.toggleMobileMenu();
                                        }}
                                        onKeyDown={e => {
                                            if (e.keyCode === 13 || e.keyCode === 32) {
                                                Utilities.toggleMobileMenu();
                                            }
                                        }}
                                    >
                                        {category.name}
                                    </a>
                                </Link>
                            </li>
                        ))}

                    {data.categories.length === 0 && (
                        <li>
                            <em>No Categories Defined</em>
                        </li>
                    )}
                </ul>
            </li>
        </>
    );
};

export { CategoriesMobileNav };
