import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Input } from 'components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './styles.module.scss';

const AutocompleteComponent = (props) => {
    const { className, options, label, variant, autoCompleteClassName, size, ...otherProps } = props;

    return (
        <div className={classNames(styles.wrapper, className)}>
            <Autocomplete
                className={autoCompleteClassName}
                renderInput={(params) => (
                    <Input {...params} label={label} variant={variant} />
                )}
                getOptionLabel={(option) => option.label}
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
};

AutocompleteComponent.defaultProps = {
    className: '',
    autoCompleteClassName: '',
    label: '',
    variant: 'outlined',
    size: 'small',
};

export default AutocompleteComponent;
