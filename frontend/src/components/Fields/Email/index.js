/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Input } from 'components/Form';
import { emptyEmail } from 'settings/constants/templates';

import styles from './styles.module.scss';

const Email = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();

    const onChangeField = (event) => {
        onChange(event, { ...value, email: event.target.value });
    };

    return (
        <div className={classNames(styles.inputWrapper, className)}>
            <div className={styles.block}>
                <Input
                    className={styles.inputField}
                    label={translate.Email}
                    value={value?.email || ''}
                    onChange={(event) => onChangeField(event)}
                />
            </div>
        </div>
    );
};

Email.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        email: '',
    }),
    onChange: PropTypes.func,
};

Email.defaultProps = {
    className: '',
    value: emptyEmail,
    onChange: () => {},
};

export default Email;
