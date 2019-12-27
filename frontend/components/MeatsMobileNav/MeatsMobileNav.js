import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { Utilities } from '../../lib/Utilities';

class MeatsMobileNav extends Component {
    toggleMenu = () => {
        if (document.getElementById('meats').style.display !== 'none') {
            document.getElementById('meats').style.display = 'none';
            document.getElementById('meats-arrow').className = 'arrow right';
        } else {
            document.getElementById('meats').style.display = 'block';
            document.getElementById('meats-arrow').className = 'arrow down';
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
                        <i id="meats-arrow" className="arrow right" />
                        Meats
                    </a>
                </li>
                <li>
                    <ul id="meats" style={{ display: 'none' }}>
                        <Query query={ALL_MEATS_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading) return <li />;
                                if (error) return <></>;

                                return data.meats.length > 0 ? (
                                    data.meats.map(meat => (
                                        <li key={meat.id}>
                                            <Link href={`/meat?id=${meat.id}`}>
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
                                                    {meat.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <em>No Meats Defined</em>
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

export { MeatsMobileNav };
