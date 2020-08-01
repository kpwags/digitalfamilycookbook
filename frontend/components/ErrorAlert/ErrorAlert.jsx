import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlertError = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 12;
    border: 1px solid hsl(0, 100%, 50%);
    box-shadow: 0 0 5px 3px hsla(0, 0%, 0%, 0.05);
    min-width: 250px;
    background: hsl(0, 0%, 100%);
    cursor: pointer;

    .close-button {
        text-align: right;
        width: 100%;
        overflow: hidden;
        float: right;
        width: 40px;

        button {
            border: none !important;
            background: hsl(0, 0%, 100%);
            display: block;
            padding: 5px 10px 0 0;
            font-size: 18px;
            color: hsl(237, 7%, 50%);
            float: right;
        }

        button:hover {
            color: hsl(0, 0%, 20%);
            cursor: pointer;
        }
    }

    .content {
        padding: 10px;
        float: left;
        color: hsl(0, 100%, 50%);
        font-weight: bold;
    }
`;

class ErrorAlert extends Component {
    static closeAlert(id) {
        document.getElementById(id).style.display = 'none';
    }

    static propTypes = {
        id: PropTypes.string,
        error: PropTypes.object
    };

    render() {
        const { id, error } = this.props;

        if (!error || !error.message) return null;

        if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
            return (
                <AlertError id={id}>
                    <div className="close-button">
                        <button
                            type="button"
                            onClick={e => {
                                e.preventDefault();
                                ErrorAlert.closeAlert(id);
                            }}
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <div className="content">
                        {error.networkError.result.errors.map((err, i) => (
                            <p key={i}>{err.message.replace('GraphQL error: ', '')}</p>
                        ))}
                    </div>
                </AlertError>
            );
        }

        return (
            <AlertError id={id}>
                <div className="close-button">
                    <button
                        type="button"
                        onClick={e => {
                            e.preventDefault();
                            ErrorAlert.closeAlert(id);
                        }}
                    >
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="content">{error.message.replace('GraphQL error: ', '')}</div>
            </AlertError>
        );
    }
}

export { ErrorAlert };
