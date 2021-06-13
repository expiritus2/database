/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Emails = (props) => {
    const { className, emails } = props;
    const { translate } = useTranslate();

    if (!emails || !emails.length) return null;

    const getValue = () => (
        <div className={styles.emailsValue}>
            {emails.map(({ id, email }) => <div key={id || email}>{email}</div>)}
        </div>
    );

    return (
        <div className={classNames(styles.emails, className)}>
            <InfoItem label={translate.Email} value={getValue()} />
        </div>
    );
};

Emails.propTypes = {
    className: PropTypes.string,
    emails: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })).isRequired,
};

Emails.defaultProps = {
    className: '',
};

export default Emails;
