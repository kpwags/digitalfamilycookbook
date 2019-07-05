import Head from 'next/head';

const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* <link rel="shortcut icon" href="/static/favicon.png" /> */}
        <link rel="stylesheet" type="text/css" href="/static/styles/master.css" />
        <link rel="stylesheet" type="text/css" href="/static/styles/nprogress.css" />
        <title>Digital Family Cookbook</title>
    </Head>
);

export default Meta;
