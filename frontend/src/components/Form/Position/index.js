import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AsyncAutocomplete } from 'components/index';

import { useTranslate } from 'hooks';

import { throttle } from 'lodash-es';
import axios from 'axios';

import styles from './styles.module.scss';

const getThrottle = throttle((val) => axios.get(`http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=${val}`), 300);

const Position = (props) => {
    const { className, onChange, value, multiple, defaultValue } = props;

    const { translate } = useTranslate();

    const createOptions = (arr) => arr.map(({ suggestion, normalized_job_title: val }) => ({
        label: suggestion, value: val,
    }));

    return (
        <AsyncAutocomplete
            label={translate.Position}
            className={classNames(styles.position, className)}
            onChange={onChange}
            value={value}
            multiple={multiple}
            defaultValue={defaultValue}
            getThrottle={getThrottle}
            createOptions={createOptions}
        />
    );
};

Position.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
    defaultValue: PropTypes.arrayOf(PropTypes.shape({})),
};

Position.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    multiple: true,
    defaultValue: undefined,
};

export default Position;
