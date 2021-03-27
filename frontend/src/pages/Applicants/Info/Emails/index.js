/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Item } from 'pages/Applicants/Info/components';

import styles from './styles.module.scss';

const Emails = (props) => {
    const { className, emails } = props;
    const { translate } = useTranslate();

    if (!emails || !emails.length) return null;

    return (
        <div className={classNames(styles.emails, className)}>
            <Item
                label={translate.Email}
                value={emails.join(', ')}
            />
        </div>
    );
};

Emails.propTypes = {
    className: PropTypes.string,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Emails.defaultProps = {
    className: '',
};

export default Emails;
