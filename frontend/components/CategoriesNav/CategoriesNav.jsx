import { useContext, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { AppContext } from '../AppContext/AppContext';
import { useClickOutside } from '../../lib/CustomHooks/useClickOutside';

const CategoriesNav = () => {
    const { categoriesMenuVisible, toggleCategoriesMenu } = useContext(AppContext);

    const categoriesNav = useRef(null);
    useClickOutside(categoriesNav, categoriesMenuVisible, toggleCategoriesMenu);

    const { data, loading, error } = useQuery(ALL_CATEGORIES_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <a
                role="button"
                tabIndex="0"
                onClick={(e) => {
                    e.preventDefault();
                    toggleCategoriesMenu();
                }}
                onKeyDown={(e) => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        toggleCategoriesMenu();
                    }
                }}
            >
                Categories <i className="arrow down" />
            </a>

            <ul ref={categoriesNav} className="child-list" style={categoriesMenuVisible ? { display: 'block' } : { display: 'none' }}>
                {data.categories.length > 0 ? (
                    data.categories.map((category) => (
                        <li key={category.id}>
                            <Link href={`/category?id=${category.id}`}>
                                <a
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        toggleCategoriesMenu();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13 || e.keyCode === 32) {
                                            toggleCategoriesMenu();
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
