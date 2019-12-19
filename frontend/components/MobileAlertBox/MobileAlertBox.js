import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AlertBox = styled.div`
    display: none;
    background: hsl(0, 0%, 22%);
    color: hsl(100, 100%, 100%);
    position: absolute;
    bottom: 0px;
    left: 0;
    font-size: 1rem;
    width: 100%;
    padding: 12px 8px;

    .close {
        position: absolute;
        top: 5px;
        right: 10px;

        a {
            color: hsl(100, 100%, 100%);
        }

        a:hover {
            text-decoration: none;
        }
    }

    @media all and (max-width: 500px) {
        display: block;
    }
`;

class MobileAlertBox extends Component {
    static closeAlert() {
        document.getElementById('mobile_alert_box').style.display = 'none';
    }

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    render() {
        const { message } = this.props;

        return (
            <AlertBox id="mobile_alert_box">
                {message}
                <div className="close">
                    <a
                        role="button"
                        tabIndex="0"
                        onClick={MobileAlertBox.closeAlert}
                        onKeyDown={e => {
                            e.preventDefault();
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                MobileAlertBox.closeAlert();
                            }
                        }}
                    >
                        x
                    </a>
                </div>
            </AlertBox>
        );
    }
}

export { MobileAlertBox };
