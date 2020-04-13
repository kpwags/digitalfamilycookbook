import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ALL_MEATS_QUERY } from '../../queries/Meat';

const TagList = styled.ul`
    list-style-type: none;

    li {
        margin: 12px 0;
        font-size: 1.1rem;

        &.active {
            font-weight: bold;
            color: ${(props) => props.theme.darkGreen};
        }

        a {
            color: ${(props) => props.theme.green};
        }
    }
`;

const RecipeSidebar = (props) => {
    const { activeId, type } = props;

    let query = null;
    if (type === 'CATEGORY') {
        query = ALL_CATEGORIES_QUERY;
    } else if (type === 'MEAT') {
        query = ALL_MEATS_QUERY;
    }

    if (query === null) {
        return <div className="error">Invalid Type</div>;
    }

    const { data, loading } = useQuery(query);

    if (loading) {
        return <></>;
    }

    if (type === 'CATEGORY') {
        return (
            <TagList>
                {data.categories.length > 0 ? (
                    data.categories.map((category) => (
                        <li key={category.id} className={category.id === activeId ? 'active' : ''}>
                            {category.id !== activeId ? (
                                <Link href={`/category?id=${category.id}`}>
                                    <a>{category.name}</a>
                                </Link>
                            ) : (
                                <span>{category.name}</span>
                            )}
                        </li>
                    ))
                ) : (
                    <li>
                        <em>No Categories</em>
                    </li>
                )}
            </TagList>
        );
    }

    if (type === 'MEAT') {
        return (
            <TagList>
                {data.meats.length > 0 ? (
                    data.meats.map((meat) => (
                        <li key={meat.id} className={meat.id === activeId ? 'active' : ''}>
                            {meat.id !== activeId ? (
                                <Link href={`/meat?id=${meat.id}`}>
                                    <a>{meat.name}</a>
                                </Link>
                            ) : (
                                <span>{meat.name}</span>
                            )}
                        </li>
                    ))
                ) : (
                    <li>
                        <em>No Meats</em>
                    </li>
                )}
            </TagList>
        );
    }

    return <div className="error">Invalid Type</div>;
};

RecipeSidebar.propTypes = {
    activeId: PropTypes.string,
    type: PropTypes.string,
};

export { RecipeSidebar };
