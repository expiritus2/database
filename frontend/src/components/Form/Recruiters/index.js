import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getResourcesUsersSelector } from 'store/selectors/resources';
import { useTranslate } from 'hooks';
import { Autocomplete } from 'components/index';
import styles from './styles.module.scss';

const Recruiters = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();
    const users = useSelector(getResourcesUsersSelector);

    const onChangeHandler = (e, val) => {
        onChange(e, val);
    };

    const createOptions = (usersVal) => (
        usersVal.map((user) => ({ id: user?.id, label: user?.email, value: user?.id }))
    );

    const getValue = () => {
        const selectedUsers = users.filter((user) => value?.includes(user?.id));
        return createOptions(selectedUsers);
    };

    return (
        <div className={classNames(styles.recruiters, className)}>
            <Autocomplete
                multiple
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
