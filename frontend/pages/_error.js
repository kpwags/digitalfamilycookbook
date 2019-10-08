import { PageError } from '../components/elements/PageError';

const Error = () => (
    <PageError
        error={{
            Title: 'Oops',
            Message: 'There seems to have been an error...'
        }}
    />
);

export default Error;
