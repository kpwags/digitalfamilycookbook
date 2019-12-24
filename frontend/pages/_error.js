import { PageError } from '../components/PageError/PageError';

const Error = () => (
    <PageError
        error={{
            Title: 'Oops',
            Message: 'There seems to have been an error...'
        }}
    />
);

export default Error;
