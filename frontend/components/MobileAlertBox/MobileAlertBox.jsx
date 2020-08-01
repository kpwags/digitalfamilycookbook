import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowDimensions from '../../lib/CustomHooks/useWindowDimensions';

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

const MobileAlertBox = props => {
    const { width } = useWindowDimensions();

    const [isVisible, setIsVisible] = useState(width <= 500);

    const closeAlert = () => {
        setIsVisible(false);
    };

    return (
        <AlertBox id="mobile_alert_box" style={isVisible ? { display: 'block' } : { display: 'none' }}>
            {props.message}
            <div className="close">
                <a
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                        closeAlert();
                    }}
                    onKeyDown={e => {
                        e.preventDefault();
                        if (e.keyCode === 13 || e.keyCode === 32) {
                            closeAlert();
                        }
                    }}
                >
                    x
                </a>
            </div>
        </AlertBox>
    );
};

MobileAlertBox.propTypes = {
    message: PropTypes.string.isRequired,
};

export { MobileAlertBox };
