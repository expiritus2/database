/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Addresses = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getValue = () => (
        <div className={styles.languageValue}>
            {list.map(({ id, name }) => (
                <div key={id}>{name}</div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.languages, className)}>
            <InfoItem label={translate.Addresses} value={getValue()} />
        </div>
    );
};

Addresses.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

Addresses.defaultProps = {
    className: '',
    list: [],
};

export default Addresses;
