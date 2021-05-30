import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getVocabularyContactsSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';
import { Select } from '../../Form';

const Contacts = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();
    const { contacts } = useSelector(getVocabularyContactsSelector);

    const createOptions = () => (
        contacts.map((contact) => ({ id: contact?.id, label: contact?.email, value: contact?.id }))
    );

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Select
                multiple={false}
                search
                label={translate.Contacts}
                variant={Select.LIGHT_FULL}
                onChange={onChange}
                value={value}
                options={createOptions()}
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
