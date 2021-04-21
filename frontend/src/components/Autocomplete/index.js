import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Input } from 'components/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './styles.module.scss';

const AutocompleteComponent = (props) => {
    const { className, options, label, variant, autoCompleteClassName, size, value, loading, ...otherProps } = props;

    const renderInput = (params) => (
        <Input
            {...params}
            label={label}
            variant={variant}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
        />
    );

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Autocomplete
                className={autoCompleteClassName}
                renderInput={renderInput}
                getOptionLabel={(option) => (option?.label || option)}
                options={options}
                size={size}
                {...otherProps}
            />
        </div>
    );
};

AutocompleteComponent.propTypes = {
    className: PropTypes.string,
    autoCompleteClassName: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    variant: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({})),
        PropTypes.shape({}),
    ]),
    loading: PropTypes.bool,

};

AutocompleteComponent.defaultProps = {
    className: '',
    autoCompleteClassName: '',
    label: '',
    variant: 'outlined',
    size: 'small',
    value: '',
    loading: false,
};

export default AutocompleteComponent;
