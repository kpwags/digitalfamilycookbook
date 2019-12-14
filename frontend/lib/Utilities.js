import Router from 'next/router';

class Utilities {
    static setTableRowActive(tableId, rowId) {
        const table = document.getElementById(tableId);
        const tbody = table.getElementsByTagName('tbody')[0];

        // TODO: Find better way?
        // eslint-disable-next-line no-restricted-syntax
        for (const row of tbody.getElementsByTagName('tr')) {
            row.className = '';
        }

        document.getElementById(rowId).className = 'selected';
    }

    // TODO: Add Message
    static invalidateField(elementId, errorMessage = '') {
        document.getElementById(elementId).className = 'errored';
        document.getElementById(elementId).parentElement.className = 'errored';

        if (errorMessage !== '') {
            document.getElementById(`${elementId}-message`).innerText = errorMessage;
            document.getElementById(`${elementId}-message`).style.display = 'block';
        }
    }

    static invalidateFieldByClass(className) {
        const elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i += 1) {
            elements[i].className = `${className}  errored`;
        }
    }

    static resetFieldByClass(className) {
        const elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i += 1) {
            let elementClassName = elements[i].className;
            elementClassName = elementClassName.replace('errored', '');
            elements[i].className = elementClassName;
        }
    }

    static resetField(elementId) {
        let { className } = document.getElementById(elementId);
        className = className.replace('errored', '');
        document.getElementById(elementId).className = className;

        let parentClassName = document.getElementById(elementId).parentElement.className;
        parentClassName = parentClassName.replace('errored', '');
        document.getElementById(elementId).parentElement.className = parentClassName;
        document.getElementById(`${elementId}-message`).style.display = 'none';
        document.getElementById(`${elementId}-message`).innerText = '';
    }

    static getNextAvailableValue(arr, idx = 'key') {
        let nextValue = 0;
        arr.forEach(item => {
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
                returnString += `${timeMinutes} minutes`;
            }
        }

        return returnString;
    }

    static convertIDArray(arr) {
        const newArr = [];
        arr.forEach(i => {
            newArr.push(i.id);
        });

        return newArr;
    }

    static toTitleCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => {
                return word.replace(word[0], word[0].toUpperCase());
            })
            .join(' ');
    }

    static goToRecipe(id) {
        Router.push({
            pathname: '/recipe',
            query: { id }
        });
    }

    static toggleElement(elementId) {
        if (document.getElementById(elementId).style.display !== 'none') {
            document.getElementById(elementId).style.display = 'none';
        } else {
            document.getElementById(elementId).style.display = 'block';
        }
    }

    static toggleMobileMenu() {
        document.getElementById('hamburgermenu').classList.toggle('change');

        if (document.getElementById('mobilemenu').style.left === '0px') {
            document.getElementById('mobilemenu').style.left = '-250px';
        } else {
            document.getElementById('mobilemenu').style.left = '0px';
        }
    }

    static toggleHeaderMenu(menuId) {
        if (
            document.getElementById(menuId).style.display === 'none' ||
            document.getElementById(menuId).style.display === ''
        ) {
            document.getElementById(menuId).style.display = 'block';
        } else {
            document.getElementById(menuId).style.display = 'none';
        }
    }

    static hideHeaderMenu(menuId) {
        document.getElementById(menuId).style.display = 'none';
    }

    static formatDate(date) {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US');
    }

    static boxColors = ['gray', 'blue', 'green', 'orange', 'purple'];
}

export { Utilities };
