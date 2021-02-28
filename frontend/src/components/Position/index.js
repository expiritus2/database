import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Autocomplete } from 'components';

import styles from './styles.module.scss';

const Position = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.position, className)}>
            <Autocomplete
                label={translate.Position}
                options={Position.options(translate)}
                value={value}
                onChange={onChange}
                getOptionSelected={(option) => option?.value || option}
            />
        </div>
    );
};

Position.options = () => [
    { id: 'test', label: 'Test', value: 'test' },
];

Position.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

Position.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
};

export default Position;
