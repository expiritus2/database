import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import styles from './styles.module.scss';

const SelectComponent = (props) => {
    const { name, options, value, onChange, className, label } = props;

    return (
        <FormControl className={classNames(styles.formControl, className)}>
            <InputLabel className={styles.label}>{label}</InputLabel>
            <Select
                native
                className={classNames(styles.wrapper)}
                value={value}
                inputProps={{ name }}
                variant="outlined"
                onChange={onChange}
            >
                <>
                    <option aria-label="None" value="" />
                    {options.map(({ id, label: lb, value: val }) => (
                        <option key={id} value={val}>{lb}</option>
                    ))}
                </>
            </Select>
        </FormControl>
    );
};

SelectComponent.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
};

SelectComponent.defaultProps = {
    className: '',
    onChange: () => {},
    name: undefined,
    value: undefined,
    label: '',
};

export default SelectComponent;
