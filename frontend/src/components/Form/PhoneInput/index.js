import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import styles from './styles.module.scss';

const PhoneInputComponent = (props) => {
    const { label, className, value, onChange } = props;
    const [focus, setFocus] = useState(false);

    return (
        <FormControl className={classNames(styles.formControl, className)}>
            <InputLabel
                variant="outlined"
                className={classNames(styles.label, { [styles.focus]: focus || !!value })}
                shrink={focus || !!value}
                focused={focus}
            >
                {label}
            </InputLabel>
            <PhoneInput
                specialLabel={null}
                inputClass={classNames(styles.input, { [styles.inputFocus]: focus })}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={onChange}
                placeholder=""
            />
        </FormControl>
    );
};

PhoneInputComponent.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

PhoneInputComponent.defaultProps = {
    className: '',
    label: '',
    value: '',
    onChange: () => {},
};

export default PhoneInputComponent;
