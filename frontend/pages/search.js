import PropTypes from 'prop-types';
import { RecipeSearchResults } from '../components/RecipeSearchResults/RecipeSearchResults';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { SearchForm } from '../components/SearchForm/SearchForm';

const SearchPage = ({ query }) => (
    <AuthGateway redirectUrl={`/category?q=${query.q}`}>
        <h1>Search Results: {query.q}</h1>
        <SearchForm keywords={query.q} />
        <RecipeSearchResults keywords={query.q} page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

SearchPage.propTypes = {
    query: PropTypes.object
};

export default SearchPage;
