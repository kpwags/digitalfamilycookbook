import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormValidator } from '../../lib/FormValidator';

const TextArea = props => {
    const [error, setError] = useState(props.error);
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setError(props.error);
        setValue(props.value);
    }, [props]);

    const validate = val => {
        if (FormValidator.validateNotEmpty(val)) {
            setError('');
        } else {
            setError(`${props.label}  is required`);
        }
    };

    return (
        <label htmlFor={props.name} className={error !== '' ? 'errored' : ''}>
            {props.label}
            <textarea
                id={props.id}
                name={props.name}
                data-testid={props.id}
                value={value}
                onChange={e => {
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                onBlur={e => {
                    e.preventDefault();

                    if (props.required) {
                        validate(e.target.value);
                    }
                }}
            />
            <div className="error-text" style={props.showErrorMessage && error !== '' ? { display: 'block' } : {}}>
                {error}
            </div>
        </label>
    );
};

TextArea.defaultProps = {
    required: false,
    showErrorMessage: true
};

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    showErrorMessage: PropTypes.bool
};

export { TextArea };
