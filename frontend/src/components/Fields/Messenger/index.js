/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslate } from 'hooks';
import { Input, Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyMessengerTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyMessengerTypesEffect } from 'store/effects/vocabulary';
import { emptyMessenger } from 'settings/constants/templates';

import styles from './styles.module.scss';

const Messenger = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const { messengerTypes, isIdle } = useSelector(getVocabularyMessengerTypesSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyMessengerTypesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangeMessenger = (event) => {
        onChange(event, { ...value, messengerType: event.target.value });
    };

    const onChangeAccountName = (event) => {
        onChange(event, { ...value, accountName: event.target.value });
    };

    return (
        <div className={classNames(styles.inputWrapper, className)}>
            <div className={styles.block}>
                <Select
                    name="messenger"
                    label={translate.Messenger}
                    className={styles.type}
                    options={messengerTypes}
                    onChange={(event) => onChangeMessenger(event)}
                    value={value?.messengerType}
                />
                <Input
                    label={translate.AccountName}
                    className={styles.number}
                    value={value?.accountName}
                    onChange={(event) => onChangeAccountName(event)}
                />
            </div>
        </div>
    );
};

Messenger.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        messengerType: PropTypes.shape({}),
        accountName: PropTypes.string,
    }),
    onChange: PropTypes.func,
};

Messenger.defaultProps = {
    className: '',
    value: emptyMessenger,
    onChange: () => {},
};

export default Messenger;
