import { AlphabeticalRecipes } from '../components/AlphabeticalRecipes/AlphabeticalRecipes';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const Alphabetical = () => (
    <AuthGateway redirectUrl="/">
        <AlphabeticalRecipes />
    </AuthGateway>
);

export default Alphabetical;
