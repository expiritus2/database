import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Select } from 'components';

import styles from './styles.module.scss';

const Currency = (props) => {
    const { className, onChange, value, name } = props;

    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.currencyWrapper, className)}>
            <Select
                name={name}
                label={translate.Currency}
                options={Currency.options}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

Currency.options = [
    { id: 'dollars', label: 'USD', value: 'USD' },
    { id: 'euro', label: 'EU', value: 'EU' },
];

Currency.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
};

Currency.defaultProps = {
    className: '',
    onChange: () => {},
    value: '',
    name: undefined,
};

export default Currency;
