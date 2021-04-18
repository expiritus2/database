import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles.module.scss';

const Textarea = (props) => {
    const { className, inputClassName, label, value, onChange, name, ...otherProps } = props;
    const [focus, setFocus] = useState(false);

    return (
        <FormControl className={classNames(styles.formControl, className)}>
            <InputLabel
                className={styles.label}
                variant="outlined"
                color="primary"
                shrink={focus || !!value}
                focused={focus}
            >
                {label}
            </InputLabel>
            <TextareaAutosize
                name={name}
                className={classNames(styles.input, { [styles.focus]: focus }, inputClassName)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={value || ''}
                onChange={onChange}
                {...otherProps}
            />
        </FormControl>
    );
};

Textarea.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    inputClassName: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
};

Textarea.defaultProps = {
    className: '',
    label: '',
    inputClassName: '',
    value: '',
    onChange: () => {},
    name: undefined,
};

export default Textarea;
