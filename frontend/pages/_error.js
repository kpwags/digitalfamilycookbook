import { PageError } from '../components/elements/PageError';
import { AuthGateway } from '../components/AuthGateway';

const Error = () => (
    <AuthGateway redirectUrl="/_error">
        <PageError
            error={{
                Title: 'Oops',
                Message: 'There seems to have been an error...'
            }}
        />
    </AuthGateway>
);

export default Error;
