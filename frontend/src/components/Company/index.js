import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import styles from './styles.module.scss';
import { Input } from '../index';

const Company = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.company, className)}>
            <Input
                name={name}
                label={translate.Company}
                className={className}
                onChange={(e) => onChange(e, e.target.value)}
                value={value}
            />
        </div>
    );
};

Company.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
};

Company.defaultProps = {
    className: '',
    onChange: () => {},
    value: PropTypes.string,
    name: undefined,
};

export default Company;
