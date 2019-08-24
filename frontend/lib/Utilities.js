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
            elements[i].className = 'className';
        }
    }

    static resetField(elementId) {
        document.getElementById(elementId).className = '';
        document.getElementById(elementId).parentElement.className = '';
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
}

export { Utilities };
