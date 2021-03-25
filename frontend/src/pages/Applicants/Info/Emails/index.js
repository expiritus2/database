/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import NumberFormat from 'react-number-format';
import { Item } from 'pages/Applicants/Info/components';

import styles from './styles.module.scss';

const Emails = (props) => {
    const { className, emails } = props;
    const { translate } = useTranslate();

    if (!emails || !emails.length) return null;

    return (
        <div className={classNames(styles.phones, className)}>
            <Item
                label={translate.Email}
                value={(
                    <NumberFormat
                        displayType="text"
                        format="+375 (##) ###-##-##"
                        value={emails.join(', ')}
                    />
                )}
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
