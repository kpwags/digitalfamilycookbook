import styled from 'styled-components';

const AdminGrid = styled.table`
    padding: 0;
    margin: 0;
    border: 1px solid #cccccc;
    width: 100%;
    thead {
        tr {
            background: ${props => props.theme.green};
            color: #ffffff;
            font-weight: bold;
            th {
                border-bottom: 1px solid #cccccc;
                padding: 0 4px;
                text-align: left;
            }
        }
    }
    tbody {
        tr {
            td {
                border-bottom: 1px solid #cccccc;
                padding: 0 4px;
                button[type='button'] {
                    color: #bbbbbb;
                    border: 1px solid #888888;
                    cursor: pointer;
                    color: #333333;
                    padding: 3px 10px;
                }
            }
        }
        tr:last-child {
            td {
                border-bottom: none;
            }
        }
        tr:nth-child(even) {
            background: ${props => props.theme.paleGreen};
        }
        tr.form-row {
            td {
                border-bottom: 1px solid #cccccc;
                padding: 12px;
            }
        }
    }
`;

export { AdminGrid };
