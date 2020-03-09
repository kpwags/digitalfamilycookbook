import styled from 'styled-components';
import PropTypes from 'prop-types';

const Overlay = styled.div`
    background: hsla(0, 0%, 71%, 0.5);
    position: absolute;
    ${props => (props.open ? 'display: block' : 'display: none')};
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 5;
`;

Overlay.propTypes = {
    open: PropTypes.bool
};

export { Overlay };
