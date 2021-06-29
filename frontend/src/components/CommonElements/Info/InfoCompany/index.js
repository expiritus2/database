/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoCompany = (props) => {
    const { className, name } = props;
    const { translate } = useTranslate();

    if (!name) return null;

    const getValue = () => (
        <div className={styles.link}>{name}</div>
    );

    return (
        <div className={classNames(styles.infoCompany, className)}>
            <InfoItem label={translate.Company} value={getValue()} />
        </div>
    );
};

InfoCompany.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
};

InfoCompany.defaultProps = {
    className: '',
    name: '',
};

export default InfoCompany;
