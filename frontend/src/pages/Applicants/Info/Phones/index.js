/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { capitalize } from 'lodash-es';

import { FormattedPhone, InfoItem } from 'components';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Phones = (props) => {
    const { className, phones } = props;
    const { translate } = useTranslate();

    if (!phones || !phones.length) return null;

    return (
        <div className={classNames(styles.phones, className)}>
            {phones.map((phone, index) => (
                <InfoItem
                    key={index}
                    label={translate[capitalize(phone?.type)] || translate.Phone}
                    value={phone?.number && <FormattedPhone>{phone?.number}</FormattedPhone>}
                />
            ))}
        </div>
    );
};

Phones.propTypes = {
    className: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
};

Phones.defaultProps = {
    className: '',
    phones: undefined,
};

export default Phones;
