import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { Utilities } from '../../lib/Utilities';

const MeatsNav = () => {
    const { data, loading, error } = useQuery(ALL_MEATS_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <a
                role="button"
                tabIndex="0"
                onClick={e => {
                    e.preventDefault();
                    Utilities.toggleHeaderMenu('meats-header-menu');
                }}
                onKeyDown={e => {
                    e.preventDefault();
                    if (e.keyCode === 13 || e.keyCode === 32) {
                        Utilities.toggleHeaderMenu('meats-header-menu');
                    }
                }}
            >
                Meats <i className="arrow down" />
            </a>

            <ul className="child-list" id="meats-header-menu">
                {data.meats.length > 0 ? (
                    data.meats.map(meat => (
                        <li key={meat.id}>
                            <Link href={`/meat?id=${meat.id}`}>
                                <a
                                    role="button"
                                    tabIndex="0"
                                    onClick={() => {
                                        Utilities.hideHeaderMenu('meats-header-menu');
                                    }}
                                    onKeyDown={e => {
                                        if (e.keyCode === 13 || e.keyCode === 32) {
                                            Utilities.hideHeaderMenu('meats-header-menu');
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
