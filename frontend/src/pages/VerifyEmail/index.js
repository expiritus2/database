import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const VerifyEmail = (props) => {
    const { className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.verifyEmail, className)}>
            <div>{translate.VerifyEmailText}</div>
        </div>
    );
};

VerifyEmail.propTypes = {
    className: PropTypes.string,
};

VerifyEmail.defaultProps = {
    className: '',
};

export default VerifyEmail;
