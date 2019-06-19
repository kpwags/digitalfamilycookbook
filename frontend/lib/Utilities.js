class Utilities {
    static SetTableRowActive(tableId, rowId) {
        const table = document.getElementById(tableId);
        const tbody = table.getElementsByTagName('tbody')[0];

        // TODO: Find better way?
        // eslint-disable-next-line no-restricted-syntax
        for (const row of tbody.getElementsByTagName('tr')) {
            row.className = '';
        }

        document.getElementById(rowId).className = 'selected';
    }
}

export { Utilities };
