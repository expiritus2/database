import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { getUsersEffect } from 'store/effects/vocabulary';
import { getResourcesUsersSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Autocomplete } from 'components/index';
import styles from './styles.module.scss';

const Recruiters = (props) => {
    const { className, onChange, value } = props;

    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const users = useSelector(getResourcesUsersSelector);
    const [defaultValue] = useState(value);

    useEffect(() => {
        dispatch(getUsersEffect());
    }, []); // eslint-disable-line

    const onChangeHandler = (e, val) => {
        onChange(e, val);
    };

    const createOptions = useCallback((usersVal) => (
        usersVal.map((user) => ({ id: user?.id, label: user?.email, value: user?.id }))
    ), []);

    const getValue = useCallback(() => {
        const selectedUsers = users.filter((user) => defaultValue.map((val) => val?.id).includes(user?.id));
        return createOptions(selectedUsers);
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Autocomplete
                label={translate.Recruiters}
                options={createOptions(users)}
                onChange={onChangeHandler}
                defaultValue={getValue()}
                getOptionSelected={(option, val) => option?.value === val?.value}
                filterSelectedOptions
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
