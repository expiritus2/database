import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Autocomplete } from 'components';

import styles from './styles.module.scss';

const Skills = (props) => {
    const { className, onChange, value, multiple } = props;
    const { translate } = useTranslate();
    const [defaultValue] = useState(value);

    return (
        <div className={classNames(styles.position, className)}>
            <Autocomplete
                multiple={multiple}
                label={translate.Skills}
                options={Skills.options(translate)}
                defaultValue={defaultValue}
                onChange={onChange}
                getOptionSelected={(option) => (
                    value.map((val) => val?.value).includes(option?.value)
                )}
            />
        </div>
    );
};

Skills.options = () => [
    { id: 'test', label: 'Test', value: 'test' },
    { id: 'test2', label: 'Test2', value: 'test2' },
    { id: 'test3', label: 'Test3', value: 'test3' },
];

Skills.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
};

Skills.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
    multiple: true,
};

export default Skills;
