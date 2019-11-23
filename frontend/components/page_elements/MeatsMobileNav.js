import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { ALL_MEATS_QUERY } from '../../queries/Meat';

const MeatsMobileNav = () => {
    const { data, loading, error } = useQuery(ALL_MEATS_QUERY);

    if (loading) return <li />;
    if (error) return <></>;

    return (
        <>
            <li className="title bordered">
                <i className="arrow down" />
                Meats
            </li>
            {data.meats.length > 0 ? (
                data.meats.map(meat => (
                    <li key={meat.id}>
                        <Link href={`/meat?id=${meat.id}`}>
                            <a>{meat.name}</a>
                        </Link>
                    </li>
                ))
            ) : (
                <li>
                    <em>No Meats Defined</em>
                </li>
            )}
        </>
    );
};

export { MeatsMobileNav };
