import { AlphabeticalRecipes } from '../components/recipes/AlphabeticalRecipes';
import { AuthGateway } from '../components/AuthGateway';

const Alphabetical = () => (
    <AuthGateway redirectUrl="/">
        <AlphabeticalRecipes />
    </AuthGateway>
);

export default Alphabetical;
