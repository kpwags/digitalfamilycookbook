import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogWindow = styled.div`
    display: none;
    background: #ffffff;
    position: absolute;
    top: 100px;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);

    .message {
        padding: 12px 0;
        text-align: center;
        font-size: 2rem;
    }

    .buttons {
        padding: 12px 0;
        text-align: center;

        button.confirm-button {
            background: ${props => props.theme.green};
            color: #ffffff;
            font-size: 2rem;
            font-weight: 600;
            padding: 0.5rem 1.2rem;
            border: 0;
            margin: 0 12px;
        }
    }
`;

class ConfirmDialog extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        width: PropTypes.string,
        height: PropTypes.string,
        yesText: PropTypes.string,
        noText: PropTypes.string,
        message: PropTypes.string.isRequired,
        continue: PropTypes.func.isRequired
    };

    static closeConfirmDialog(e, id) {
        e.preventDefault();
        document.getElementById(id).style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
    }

    render() {
        const { id, width = 500, height = 300, yesText = 'Yes', noText = 'No' } = this.props;
        const marginLeftVal = `${(width / 2) * -1}px`;

        const popupStyle = {
            margin: `0 0 0 ${marginLeftVal}`,
            height: `${height}px`,
            width: `${width}px`
        };

        return (
            <DialogWindow id={id} style={popupStyle}>
                <div className="message">{this.props.message}</div>
                <div className="buttons">
                    <button className="confirm-button" type="button" onClick={this.props.continue}>
                        {yesText}
                    </button>
                    <button
                        className="confirm-button"
                        type="button"
                        onClick={e => {
                            ConfirmDialog.closeConfirmDialog(e, id);
                        }}
                    >
                        {noText}
                    </button>
                </div>
            </DialogWindow>
        );
    }
}

export { ConfirmDialog };
