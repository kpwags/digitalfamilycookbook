import { CreateRecipeForm } from '../components/CreateRecipeForm/CreateRecipeForm';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const CreateRecipe = () => (
    <AuthGateway redirectUrl="/create-recipe" permissionNeeded="USER">
        <CreateRecipeForm />
    </AuthGateway>
);

export default CreateRecipe;
