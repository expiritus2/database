import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { getUsersEffect } from 'store/effects/vocabulary';
import { getVocabularyUsersSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import styles from './styles.module.scss';

const Recruiters = (props) => {
    const { className, onChange, value } = props;

    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { users } = useSelector(getVocabularyUsersSelector);

    useEffect(() => {
        dispatch(getUsersEffect());
    }, []); // eslint-disable-line

    const createOptions = () => (
        users.map((user) => ({ id: user?.id, label: user?.email, value: user?.id }))
    );

    const createValue = () => (
        value.map((user) => ({ id: user?.id, label: user?.email || user?.label, value: user?.id }))
    );

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Select
                multiple
                search
                label={translate.Recruiters}
                onChange={onChange}
                value={createValue()}
                options={createOptions()}
            />
        </div>
    );
};

Recruiters.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

Recruiters.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Recruiters;
