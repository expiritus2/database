import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { getVocabularyContactsSelector } from 'store/selectors/vocabulary';
import { getVocabularyContactsEffect } from 'store/effects/vocabulary';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';
import { Select } from '../../Form';

const Contacts = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { contacts } = useSelector(getVocabularyContactsSelector);

    useEffect(() => {
        dispatch(getVocabularyContactsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    const createOptions = () => (
        contacts.map((contact) => ({ id: contact?.id, label: contact?.name, value: contact?.id }))
    );

    const createValue = () => (
        value.map((contact) => ({
            id: contact?.id,
            label: contact?.label || contact?.name,
            value: contact?.value || contact?.id,
        }))
    );

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Select
                multiple
                search
                label={translate.Contacts}
                onChange={onChange}
                value={createValue()}
                options={createOptions()}
            />
        </div>
    );
};

Contacts.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Contacts.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Contacts;
