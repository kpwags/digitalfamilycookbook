import { CreateRecipeForm } from '../components/forms/recipe/CreateRecipeForm';
import { AuthGateway } from '../components/AuthGateway';

const CreateRecipe = () => (
    <AuthGateway redirectUrl="/create-recipe">
        <CreateRecipeForm />
    </AuthGateway>
);

export default CreateRecipe;
