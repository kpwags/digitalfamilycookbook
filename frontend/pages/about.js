import styled from 'styled-components';

const AboutPage = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    @media all and (max-width: 500px) {
        display: block;
        padding: 0 15px;
    }

    .content {
        grid-column-start: 2;
        grid-column-end: 2;
    }
`;

const About = () => {
    return (
        <AboutPage>
            <div className="content">
                <h1>About</h1>
                <p>
                    Digitial Family Cookbook is first and foremost an open source recipe management system. It was developed by{' '}
                    <a href="https://kpwags.com">Keith Wagner</a>.
                </p>
                <p>
                    It started as a way to condense all the recipes my wife and I cook. It also ended up as a project for Keith to teach himself React, Node.js,
                    &amp; GraphQL.
                </p>
                <p>It's free to download, install and use for anyone who wants to store their recipes and have full control of their data.</p>
            </div>
        </AboutPage>
    );
};

export default About;
