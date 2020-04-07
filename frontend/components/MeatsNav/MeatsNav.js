import { useContext, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { AppContext } from '../AppContext/AppContext';
import { useClickOutside } from '../../lib/CustomHooks/useClickOutside';

const MeatsNav = () => {
    const { meatsMenuVisible, toggleMeatsMenu } = useContext(AppContext);

    const meatsNav = useRef(null);
    useClickOutside(meatsNav, meatsMenuVisible, toggleMeatsMenu);

    const { data, loading, error } = useQuery(ALL_MEATS_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <a
                role="button"
                tabIndex="0"
                onClick={(e) => {
                    e.preventDefault();
                    toggleMeatsMenu();
                }}
                onKeyDown={(e) => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        toggleMeatsMenu();
                    }
                }}
            >
                Meats <i className="arrow down" />
            </a>

            <ul ref={meatsNav} className="child-list" style={meatsMenuVisible ? { display: 'block' } : { display: 'none' }}>
                {data.meats.length > 0 ? (
                    data.meats.map((meat) => (
                        <li key={meat.id}>
                            <Link href={`/meat?id=${meat.id}`}>
                                <a
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        toggleMeatsMenu();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13 || e.keyCode === 32) {
                                            toggleMeatsMenu();
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
                )}
            </ul>
        </li>
    );
};

export { MeatsNav };
