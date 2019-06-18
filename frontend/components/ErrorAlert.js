import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlertError = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 12;
    border: 1px solid #ff0000;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    min-width: 250px;
    background: #ffffff;
    cursor: pointer;

    .close-button {
        text-align: right;
        width: 100%;
        overflow: hidden;
        float: right;
        width: 40px;

        button {
            border: none !important;
            background: #ffffff;
            display: block;
            padding: 5px 10px 0 0;
            font-size: 18px;
            color: #777888;
            float: right;
        }

        button:hover {
            color: #333333;
            cursor: pointer;
        }
    }

    .content {
        padding: 10px;
        float: left;
        color: #ff0000;
        font-weight: bold;
    }
`;

class ErrorAlert extends Component {
    static propTypes = {
        id: PropTypes.string,
        error: PropTypes.object
    };

    static closeAlert(id) {
        document.getElementById(id).style.display = 'none';
    }

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
