import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogWindow = styled.div`
    display: none;
    background: hsl(0, 0%, 100%);
    position: absolute;
    top: 100px;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    z-index: 10;
    border-radius: 6px;
    box-shadow: 0 0 5px 3px hsla(0, 0%, 0%, 0.05);

    .message {
        padding: 12px 0;
        text-align: center;
        font-size: 1.2rem;
    }

    .buttons {
        padding: 12px 0;
        text-align: center;

        button.confirm-button {
            color: white;
            border-radius: 6px;
            margin: 0 15px;
            border-radius: 6px;
            border-width: 1px;
            border-style: solid;
            padding: 5px 15px;
            cursor: pointer;
            font-size: 1rem;
            background: ${props => props.theme.green};
            border-color: ${props => props.theme.green};
        }
    }
`;

const ConfirmDialog = props => {
    const [visible, setVisible] = useState(props.open);
    const [initialLoad, setInitialLoad] = useState(true);

    const { width = 500, yesText = 'Yes', noText = 'No' } = props;
    const marginLeftVal = `${(width / 2) * -1}px`;

    let { height = 'auto' } = props;
    if (!Number.isNaN(height)) {
        height = `${height}px`;
    }

    const popupStyle = {
        margin: `0 0 0 ${marginLeftVal}`,
        height,
        width: `${width}px`,
        display: visible ? 'block' : 'none'
    };

    useEffect(() => {
        if (!initialLoad) {
            setVisible(!visible);
        } else {
            setInitialLoad(false);
        }
    }, [props.open]);

    return (
        <DialogWindow style={popupStyle}>
            <div className="message">{props.message}</div>
            <div className="buttons">
                <button className="confirm-button" type="button" onClick={props.continue}>
                    {yesText}
                </button>
                <button className="confirm-button" type="button" onClick={props.cancel}>
                    {noText}
                </button>
            </div>
        </DialogWindow>
    );
};

ConfirmDialog.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    yesText: PropTypes.string,
    noText: PropTypes.string,
    message: PropTypes.string.isRequired,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    open: PropTypes.bool
};

export { ConfirmDialog };
