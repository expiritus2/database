/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoContacts = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getValue = () => (
        <div>
            {list.map(({ id, name }) => (
                <div key={id} className={styles.link}>{name}</div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.contacts, className)}>
            <InfoItem label={translate.Contacts} value={getValue()} />
        </div>
    );
};

InfoContacts.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

InfoContacts.defaultProps = {
    className: '',
    list: [],
};

export default InfoContacts;
