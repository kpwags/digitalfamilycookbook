import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormValidator } from '../../lib/FormValidator';

const TextInput = props => {
    const [error, setError] = useState(props.error);
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setError(props.error);
        setValue(props.value);
    }, [props]);

    const validate = (val, rule, args) => {
        let validationResult = { valid: true, message: '' };

        switch (rule.toLowerCase()) {
            case 'email':
                if (FormValidator.validateEmail(val)) {
                    setError('');
                } else {
                    setError('Valid email address required');
                }
                break;

            case 'notempty':
                if (FormValidator.validateNotEmpty(val)) {
                    setError('');
                } else {
                    setError(`${props.label}  is required`);
                }
                break;

            case 'setlength':
                validationResult = FormValidator.validateSetLength(val, props.label, args.min, args.max);
                setError(validationResult.message);
                break;

            case 'numeric':
                if (FormValidator.validateNumeric(val)) {
                    setError('');
                } else {
                    setError(`${props.label}  is required`);
                }
                break;

            case 'requirednumeric':
                if (FormValidator.validateRequiredNumeric(val)) {
                    setError('');
                } else {
                    setError(`${props.label}  is required`);
                }
                break;

            default:
                setError('');
                break;
        }
    };

    return (
        <label htmlFor={props.name} className={error !== '' ? 'errored' : ''}>
            {props.label}
            <input
                type="text"
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

                    if (props.validate) {
                        props.validate(e);
                    } else if (props.validationRule) {
                        validate(e.target.value, props.validationRule, props.validationArgs);
                    }
                }}
            />
            <div className="error-text" style={error !== '' ? { display: 'block' } : {}}>
                {error}
            </div>
        </label>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    validationRule: PropTypes.string,
    validate: PropTypes.func,
    validationArgs: PropTypes.object
};

export { TextInput };
