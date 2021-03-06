/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { capitalize } from 'lodash-es';

import { useTranslate } from 'hooks';
import NumberFormat from 'react-number-format';
import { Item } from 'pages/Applicants/Info/components';

import styles from './styles.module.scss';

const Phones = (props) => {
    const { className, phones } = props;
    const { translate } = useTranslate();

    if (!phones || !phones.length) return null;

    return (
        <div className={classNames(styles.phones, className)}>
            {phones.map((phone, index) => (
                <Item
                    key={index}
                    label={translate[capitalize(phone?.type)]}
                    value={(
                        <NumberFormat
                            displayType="text"
                            format="+375 (##) ###-##-##"
                            value={phone?.number}
                        />
                    )}
                />
            ))}
        </div>
    );
};

Phones.propTypes = {
    className: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })).isRequired,
};

Phones.defaultProps = {
    className: '',
};

export default Phones;
