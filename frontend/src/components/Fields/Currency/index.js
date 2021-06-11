import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyCurrenciesSelector } from 'store/selectors/vocabulary';
import { getVocabularyCurrenciesEffect } from 'store/effects/vocabulary';
import styles from './styles.module.scss';

const Currency = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();

    const dispatch = useDispatch();
    const { currencies } = useSelector(getVocabularyCurrenciesSelector);

    useEffect(() => {
        dispatch(getVocabularyCurrenciesEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.currencyWrapper, className)}>
            <Select
                name={name}
                label={translate.Currency}
                options={currencies}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

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
