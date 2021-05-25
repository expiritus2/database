import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';

import { InputLabel } from 'components/Form-NEW';
import styles from './styles.module.scss';

const PhoneInputComponent = (props) => {
    const { label, className, value, onChange } = props;
    const [phoneVal, setPhoneVal] = useState(value);

    useEffect(() => setPhoneVal(value), [value]);

    const id = 'phoneInput';

    return (
        <div className={classNames(styles.formControl, className)}>
            <InputLabel label={label} id={id} />
            <PhoneInput
                id={id}
                specialLabel={null}
                inputClass={classNames(styles.input)}
                buttonClass={styles.dropdown}
                containerClass={styles.container}
                onChange={onChange}
                placeholder=""
                value={phoneVal}
            />
        </div>
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
