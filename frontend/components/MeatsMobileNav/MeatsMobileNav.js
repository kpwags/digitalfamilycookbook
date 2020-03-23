import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { Utilities } from '../../lib/Utilities';

const MeatsMobileNav = () => {
    const [expanded, setExpanded] = useState(false);

    const { data, loading, error } = useQuery(ALL_MEATS_QUERY);

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
                    <i id="meats-arrow" className={expanded ? 'arrow down' : 'arrow right'} />
                    Meats
                </a>
            </li>
            <li>
                <ul id="meats" style={expanded ? { display: 'block' } : { display: 'none' }}>
                    {data.meats.length > 0 &&
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
                                            if (e.keyCode === 13 || e.keyCode === 32) {
                                                Utilities.toggleMobileMenu();
                                            }
                                        }}
                                    >
                                        {meat.name}
                                    </a>
                                </Link>
                            </li>
                        ))}{' '}
                    : (
                    {data.meats.length === 0 && (
                        <li>
                            <em>No Meats Defined</em>
                        </li>
                    )}
                </ul>
            </li>
        </>
    );
};

export { MeatsMobileNav };
