import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { AsyncAutocomplete } from 'components';

import { throttle } from 'lodash-es';
import axios from 'axios';

import styles from './styles.module.scss';

const getThrottle = throttle((val) => axios.get(`http://api.dataatwork.org/v1/skills/autocomplete?begins_with=${val}`), 300);

const Skills = (props) => {
    const { className, onChange, value, multiple, defaultValue } = props;

    const { translate } = useTranslate();

    const createOptions = (arr) => arr.map(({ suggestion, normalized_skill_name: val }) => ({
        label: suggestion, value: val,
    }));
    return (
        <AsyncAutocomplete
            label={translate.Skills}
            className={classNames(styles.position, className)}
            onChange={onChange}
            value={value}
            multiple={multiple}
            defaultValue={defaultValue}
            getThrottle={getThrottle}
            createOptions={createOptions}
            convertTitleCaseIfNew={false}
        />
    );
};

Skills.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
    defaultValue: PropTypes.arrayOf(PropTypes.shape({})),
};

Skills.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    multiple: true,
    defaultValue: undefined,
};

export default Skills;
