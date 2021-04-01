import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles.module.scss';

const Textarea = (props) => {
    const { className, inputClassName, label, value, ...otherProps } = props;
    const [focus, setFocus] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => setInputValue(value), [value]);

    return (
        <FormControl className={classNames(styles.formControl, className)}>
            <InputLabel
                className={styles.label}
                variant="outlined"
                color="primary"
                shrink={focus || !!inputValue}
                focused={focus}
            >
                {label}
            </InputLabel>
            <TextareaAutosize
                className={classNames(styles.input, { [styles.focus]: focus }, inputClassName)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={inputValue || ''}
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
};

Textarea.defaultProps = {
    className: '',
    label: '',
    inputClassName: '',
    value: '',
};

export default Textarea;
