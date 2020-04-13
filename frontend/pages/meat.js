import PropTypes from 'prop-types';
import { RecipesByMeat } from '../components/RecipesByMeat/RecipesByMeat';
import { RecipeSidebar } from '../components/RecipeSidebar/RecipeSidebar';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { RecipeTagPage } from '../components/RecipeTagPage/RecipeTagPage';

const MeatPage = ({ query }) => {
    let redirectUrl = '/meat';
    if (query.id) {
        redirectUrl = `/meat?id=${query.id}`;
    }

    return (
        <AuthGateway redirectUrl={redirectUrl}>
            <RecipeTagPage>
                <div>
                    <h2>Meats</h2>
                    <RecipeSidebar type="MEAT" activeId={query.id} />
                </div>
                <div>{query.id && <RecipesByMeat id={query.id} page={parseInt(query.page || 1, 10)} />}</div>
            </RecipeTagPage>
        </AuthGateway>
    );
};

MeatPage.propTypes = {
    query: PropTypes.object,
};

export default MeatPage;
