import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseX } from '../CloseX/CloseX';

const Window = styled.div`
    display: none;
    background: hsl(0, 0%, 100%);
    position: absolute;
    top: 100px;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 0 0 5px 3px hsla(0, 0%, 0%, 0.05);

    form {
        box-shadow: none;
        background: hsl(0, 0%, 100%);
        padding: 0 20px 20px;
    }

    .close-button {
        text-align: right;
        width: 100%;
        overflow: hidden;

        button {
            border: none;
            background: hsl(0, 0%, 100%);
            display: block;
            padding: 10px 10px 0 0;
            font-size: 18px;
            color: hsl(236.5, 6.7%, 50%);
            float: right;
        }

        button:hover {
            color: hsl(0, 0%, 20%);
            cursor: pointer;
        }
    }
`;

class ModalWindow extends Component {
    static closePopup(e, id) {
        e.preventDefault();
        document.getElementById(id).style.display = 'none';
        document.getElementById('page-overlay').style.display = 'none';
    }

    static propTypes = {
        id: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        children: PropTypes.node
    };

    render() {
        const { id, width = 500, height = 300 } = this.props;
        const marginLeftVal = `${(width / 2) * -1}px`;

        const popupStyle = {
            margin: `0 0 0 ${marginLeftVal}`,
            height: `${height}px`,
            width: `${width}px`
        };

        return (
            <>
                <Window id={id} style={popupStyle}>
                    <div className="close-button">
                        <button
                            type="button"
                            onClick={e => {
                                ModalWindow.closePopup(e, id);
                            }}
                        >
                            <CloseX width="15" height="15" fill="#666666" />
                        </button>
                    </div>
                    <div className="content">{this.props.children}</div>
                </Window>
            </>
        );
    }
}

export { ModalWindow };
