/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoEmails = (props) => {
    const { className, emails } = props;
    const { translate } = useTranslate();

    if (!emails || !emails.length) return null;

    const getValue = () => (
        <div>
            {emails.map(({ id, email }) => (
                <div key={id || email}>
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.emails, className)}>
            <InfoItem label={translate.Email} value={getValue()} />
        </div>
    );
};

InfoEmails.propTypes = {
    className: PropTypes.string,
    emails: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

InfoEmails.defaultProps = {
    className: '',
    emails: [],
};

export default InfoEmails;
