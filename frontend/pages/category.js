import PropTypes from 'prop-types';
import { RecipesByCategory } from '../components/RecipesByCategory/RecipesByCategory';
import { RecipeSidebar } from '../components/RecipeSidebar/RecipeSidebar';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { RecipeTagPage } from '../components/RecipeTagPage/RecipeTagPage';

const CategoryPage = ({ query }) => {
    let redirectUrl = '/category';
    if (query.id) {
        redirectUrl = `/category?id=${query.id}`;
    }

    return (
        <AuthGateway redirectUrl={redirectUrl}>
            <RecipeTagPage>
                <div>
                    <h2>Categories</h2>
                    <RecipeSidebar type="CATEGORY" activeId={query.id} />
                </div>
                <div>{query.id && <RecipesByCategory id={query.id} page={parseInt(query.page || 1, 10)} />}</div>
            </RecipeTagPage>
        </AuthGateway>
    );
};

CategoryPage.propTypes = {
    query: PropTypes.object,
};

export default CategoryPage;
