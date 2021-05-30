import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { USD, EU, BYR, RUR } from 'settings/constants/currency';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form';

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
    { id: 'dollars', label: 'USD', value: USD },
    { id: 'euro', label: 'EU', value: EU },
    { id: 'byr', label: 'BYR', value: BYR },
    { id: 'rur', label: 'RUR', value: RUR },
];

Currency.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.shape({
        currency: PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    }),
    name: PropTypes.string,
};

Currency.defaultProps = {
    className: '',
    onChange: () => {},
    value: {},
    name: undefined,
};

export default Currency;
