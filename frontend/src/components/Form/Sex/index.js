import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form-NEW';

import styles from './styles.module.scss';

const Sex = (props) => {
    const { className, name, onChange, label, value } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Select
                name={name}
                label={label}
                onChange={onChange}
                options={Sex.options(translate)}
                value={value}
            />
        </div>
    );
};

Sex.options = (translate) => [
    { label: translate.Male, value: 'male' },
    { label: translate.Female, value: 'female' },
];

Sex.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

Sex.defaultProps = {
    className: '',
    name: '',
    label: '',
    value: '',
    onChange: () => {},
};

export default Sex;
