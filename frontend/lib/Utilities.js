import Router from 'next/router';

class Utilities {
    static getNextAvailableValue(arr, idx = 'key') {
        let nextValue = 0;
        arr.forEach((item) => {
            if (item[idx] >= nextValue) {
                nextValue = item[idx];
            }
        });

        nextValue += 1;

        return nextValue;
    }

    static convertCookingTime(time) {
        let timeHours = 0;
        let timeMinutes = 0;

        let returnString = '';

        if (time !== null && parseInt(time, 10) > 0) {
            timeHours = Math.floor(time / 60);
            timeMinutes = time % 60;

            if (timeHours === 1) {
                returnString += `${timeHours} hour`;
            } else if (timeHours > 1) {
                returnString += `${timeHours} hours`;
            }

            if (timeHours > 0 && timeMinutes > 0) {
                returnString += ', ';
            }

            if (timeMinutes > 0) {
                returnString += `${timeMinutes} minute`;
            }

            if (timeMinutes > 1) {
                returnString += 's';
            }
        }

        return returnString;
    }

    static convertIDArray(arr) {
        const newArr = [];
        arr.forEach((i) => {
            newArr.push(i.id);
        });

        return newArr;
    }

    static toTitleCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => {
                return word.replace(word[0], word[0].toUpperCase());
            })
            .join(' ');
    }

    static goToRecipe(id) {
        Router.push({
            pathname: '/recipe',
            query: { id },
        });
    }

    static formatDate(date) {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US');
    }

    static deleteTableRow(rowId) {
        const tr = document.querySelector(`#${rowId}`);
        tr.parentNode.removeChild(tr);
    }

    /**
     * Takes a numeric field value and returns null if the field is blank
     * @param {string} value The numeric value to check
     * @returns {number} Returns a number if not blank, or null if blank
     */
    static nullifyBlankNumber(value) {
        if (value === '') {
            return null;
        }

        return parseFloat(value);
    }

    static boxColors = ['gray', 'blue', 'green', 'orange', 'purple'];
}

export { Utilities };
