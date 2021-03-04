import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

const DatePicker = (props) => {
    const { className, name, label, value, onChange } = props;

    return (
        <div className={classNames(styles.datePicker, className)}>
            <TextField
                name={name}
                label={label}
                type="date"
                value={value}
                className={styles.textField}
                onChange={onChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};

DatePicker.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.number]),
    onChange: PropTypes.func,
};

DatePicker.defaultProps = {
    className: '',
    name: '',
    label: '',
    value: '',
    onChange: () => {},
};

export default DatePicker;
