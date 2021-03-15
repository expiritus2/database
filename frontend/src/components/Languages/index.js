import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Autocomplete } from 'components';
import styles from './styles.module.scss';

const Languages = (props) => {
    const { className, onChange, value, name, label } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.languages, className)}>
            <Autocomplete
                multiple
                name={name}
                label={label}
                options={Languages.options(translate)}
                onChange={onChange}
                defaultValue={value}
                getOptionSelected={(option, val) => option?.value === val?.value}
                filterSelectedOptions
            />
        </div>
    );
};

Languages.options = (translate) => [
    { label: translate.English, value: 'english' },
    { label: translate.Russian, value: 'russian' },
];

Languages.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })),
    ]),
    label: PropTypes.string,
};

Languages.defaultProps = {
    name: undefined,
    className: '',
    onChange: () => {},
    value: [],
    label: '',
};

export default Languages;
