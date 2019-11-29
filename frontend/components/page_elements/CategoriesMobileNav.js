import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { Utilities } from '../../lib/Utilities';

class CategoriesMobileNav extends Component {
    toggleMenu = () => {
        if (document.getElementById('categories').style.display !== 'none') {
            document.getElementById('categories').style.display = 'none';
            document.getElementById('categories-arrow').className =
                'arrow right';
        } else {
            document.getElementById('categories').style.display = 'block';
            document.getElementById('categories-arrow').className =
                'arrow down';
        }
    };

    render() {
        return (
            <>
                <li className="title bordered">
                    <a
                        role="button"
                        tabIndex="0"
                        onClick={e => {
                            e.preventDefault();
                            this.toggleMenu();
                        }}
                        onKeyDown={e => {
                            e.preventDefault();
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                this.toggleMenu();
                            }
                        }}
                    >
                        <i id="categories-arrow" className="arrow right" />
                        Categories
                    </a>
                </li>
                <li>
                    <ul id="categories" style={{ display: 'none' }}>
                        <Query query={ALL_CATEGORIES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading) return <li />;
                                if (error) return <></>;

                                return data.categories.length > 0 ? (
                                    data.categories.map(category => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/category?id=${category.id}`}
                                            >
                                                <a
                                                    role="button"
                                                    tabIndex="0"
                                                    onClick={() => {
                                                        Utilities.toggleMobileMenu();
                                                    }}
                                                    onKeyDown={e => {
                                                        if (
                                                            e.keyCode === 13 ||
                                                            e.keyCode === 32
                                                        ) {
                                                            Utilities.toggleMobileMenu();
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
                                );
                            }}
                        </Query>
                    </ul>
                </li>
            </>
        );
    }
}

export { CategoriesMobileNav };
