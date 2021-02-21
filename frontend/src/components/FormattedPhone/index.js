import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';

import styles from './styles.module.scss';

const FormattedPhone = (props) => {
    const { testid, children, className, options } = props;

    return (
        <div testid={testid} className={classNames(styles.inputWrapper, className)}>
            <PhoneInput
                inputClass={styles.phone}
                buttonClass={styles.dropdownButton}
                enableAreaCodes
                preferredCountries={FormattedPhone.preferredCountries}
                country="us"
                value={children}
                disabled
                autocompleteSearch
                countryCodeEditable
                disableDropdown
                {...options}
            />
        </div>
    );
};

FormattedPhone.preferredCountries = ['us'];

FormattedPhone.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    options: PropTypes.shape({}),
    testid: PropTypes.string,
};

FormattedPhone.defaultProps = {
    className: '',
    children: '',
    options: {},
    testid: undefined,
};

export default FormattedPhone;
