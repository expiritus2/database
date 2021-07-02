import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormattedPhone, InfoItem } from 'components';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const InfoPhones = (props) => {
    const { className, phones } = props;
    const { translate } = useTranslate();

    if (!phones || !phones.length) return null;

    return (
        <div className={classNames(styles.phones, className)}>
            {phones.map((phone) => (
                <InfoItem
                    key={phone?.id}
                    label={phone?.phoneType?.label || translate.Phone}
                    value={phone?.number && <FormattedPhone>{phone?.number}</FormattedPhone>}
                />
            ))}
        </div>
    );
};

InfoPhones.propTypes = {
    className: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.shape({
        phoneType: PropTypes.shape({
            label: PropTypes.string,
        }),
        number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
};

InfoPhones.defaultProps = {
    className: '',
    phones: undefined,
};

export default InfoPhones;