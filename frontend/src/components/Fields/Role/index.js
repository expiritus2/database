import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Select } from 'components/Form';
import { useTranslate } from 'hooks';
import { rolesOptions } from 'settings/constants/user';

import styles from './styles.module.scss';

const Role = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Select
                options={rolesOptions(translate)}
                value={value}
                label={translate.Role}
                onChange={onChange}
            />
        </div>
    );
};

Role.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    onChange: PropTypes.func,
};

Role.defaultProps = {
    className: '',
    value: null,
    onChange: () => {},
};

export default Role;
