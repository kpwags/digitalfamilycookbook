import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { DownArrow } from '../svg/DownArrow';
import { ALL_MEATS_QUERY } from '../../queries/Meat';

const MeatsNav = () => {
    const { data, loading, error } = useQuery(ALL_MEATS_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <li>
            <Link href="/">
                <a>
                    Meats <DownArrow width={15} height={15} fill="#fff" viewbox="0 0 129 129" />
                </a>
            </Link>

            <ul className="child-list">
                {data.meats.length > 0 ? (
                    data.meats.map(meat => (
                        <li key={meat.id}>
                            <Link href="/">
                                <a>{meat.name}</a>
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
