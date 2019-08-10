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
}

export { Utilities };
