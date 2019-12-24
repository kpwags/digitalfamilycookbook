import styled from 'styled-components';
import { RecipesByLetter } from '../RecipesByLetter/RecipesByLetter';

const AlphaList = styled.ul`
    list-style-type: none;

    li {
        padding: 0 10px;
        display: inline;
    }
`;

const AlphabeticalRecipes = () => {
    return (
        <>
            <h1>Recipes</h1>

            <AlphaList>
                <li>
                    <a href="#a">A</a>
                </li>
                <li>
                    <a href="#b">B</a>
                </li>
                <li>
                    <a href="#c">C</a>
                </li>
                <li>
                    <a href="#d">D</a>
                </li>
                <li>
                    <a href="#e">E</a>
                </li>
                <li>
                    <a href="#f">F</a>
                </li>
                <li>
                    <a href="#g">G</a>
                </li>
                <li>
                    <a href="#h">H</a>
                </li>
                <li>
                    <a href="#i">I</a>
                </li>
                <li>
                    <a href="#j">J</a>
                </li>
                <li>
                    <a href="#k">K</a>
                </li>
                <li>
                    <a href="#l">L</a>
                </li>
                <li>
                    <a href="#m">M</a>
                </li>
                <li>
                    <a href="#n">N</a>
                </li>
                <li>
                    <a href="#o">O</a>
                </li>
                <li>
                    <a href="#p">P</a>
                </li>
                <li>
                    <a href="#q">Q</a>
                </li>
                <li>
                    <a href="#r">R</a>
                </li>
                <li>
                    <a href="#s">S</a>
                </li>
                <li>
                    <a href="#t">T</a>
                </li>
                <li>
                    <a href="#u">U</a>
                </li>
                <li>
                    <a href="#v">V</a>
                </li>
                <li>
                    <a href="#w">W</a>
                </li>
                <li>
                    <a href="#x">X</a>
                </li>
                <li>
                    <a href="#y">Y</a>
                </li>
                <li>
                    <a href="#z">Z</a>
                </li>
            </AlphaList>

            <RecipesByLetter letter="a" />
            <RecipesByLetter letter="b" />
            <RecipesByLetter letter="c" />
            <RecipesByLetter letter="d" />
            <RecipesByLetter letter="e" />
            <RecipesByLetter letter="f" />
            <RecipesByLetter letter="g" />
            <RecipesByLetter letter="h" />
            <RecipesByLetter letter="i" />
            <RecipesByLetter letter="j" />
            <RecipesByLetter letter="k" />
            <RecipesByLetter letter="l" />
            <RecipesByLetter letter="m" />
            <RecipesByLetter letter="n" />
            <RecipesByLetter letter="o" />
            <RecipesByLetter letter="p" />
            <RecipesByLetter letter="q" />
            <RecipesByLetter letter="r" />
            <RecipesByLetter letter="s" />
            <RecipesByLetter letter="t" />
            <RecipesByLetter letter="u" />
            <RecipesByLetter letter="v" />
            <RecipesByLetter letter="w" />
            <RecipesByLetter letter="x" />
            <RecipesByLetter letter="y" />
            <RecipesByLetter letter="z" />
        </>
    );
};

export { AlphabeticalRecipes };
