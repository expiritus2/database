import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getVocabularyContactsSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Autocomplete } from 'components/index';
import styles from './styles.module.scss';

const Contacts = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();
    const contacts = useSelector(getVocabularyContactsSelector);

    const onChangeHandler = (e, val) => {
        onChange(e, val);
    };

    const createOptions = (usersVal) => (
        usersVal.map((user) => ({ id: user?.id, label: user?.email, value: user?.id }))
    );

    const getValue = () => {
        const selectedUsers = contacts.filter((contact) => value?.includes(contact?.id));
        return createOptions(selectedUsers);
    };

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Autocomplete
                multiple
                label={translate.Contacts}
                options={createOptions(contacts)}
                onChange={onChangeHandler}
                defaultValue={getValue()}
                getOptionSelected={(option, val) => option?.value === val?.value}
                filterSelectedOptions
            />
        </div>
    );
};

Contacts.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

Contacts.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Contacts;
