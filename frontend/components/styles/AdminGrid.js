import styled from 'styled-components';

const AdminGrid = styled.table`
    padding: 0;
    margin: 0 auto;
    border: 1px solid #cccccc;
    width: 100%;
    thead {
        tr {
            background: ${props => props.theme.green};
            color: #ffffff;
            font-weight: normal;
            font-size: 1.2rem;
            padding: 5px 0;
            border: none;
            th {
                border-bottom: 1px solid #cccccc;
                padding: 0 4px;
                border-right: 1px solid ${props => props.theme.paleGreen};
                text-align: left;
            }
            th.no-border {
                border-right: none;
            }
            th:last-child {
                border-right: none;
            }
        }
    }
    tbody {
        tr {
            td {
                border-bottom: 1px solid #cccccc;
                padding: 0.2rem 0.5rem;
                font-size: 1.1rem;
                button[type='button'] {
                    background: ${props => props.theme.green};
                    border: 1px solid ${props => props.theme.darkGreen};
                    cursor: pointer;
                    color: #ffffff;
                    padding: 1px 10px;
                    font-size: 1rem;
                }
                button[type='button'].wide {
                    min-width: 100px;
                }
            }
        }
        tr:last-child {
            td {
                border-bottom: none;
            }
        }
        tr:nth-child(even) {
            background: hsl(0, 0%, 95%);
        }
        tr:hover {
            td {
                background: ${props => props.theme.paleGreen};
            }
        }
    }
`;

export { AdminGrid };
