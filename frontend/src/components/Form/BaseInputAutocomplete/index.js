import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AsyncAutocomplete } from 'components/index';
import { intersectionBy, uniqBy } from 'lodash-es';

const BaseInputAutocomplete = (props) => {
    const { className, onChange, value, multiple, label: propsLabel, options, convertTitleCaseIfNew } = props;
    const [optionsValue, setOptionsValue] = useState(options);

    const createOptions = (arr) => arr.map(({ label, value: val }) => ({
        label, value: val,
    }));

    const getThrottle = useMemo(() => () => new Promise((resolve) => {
        resolve({ data: [...value, ...optionsValue] });
    }), [optionsValue, value]);

    const onChangeHandler = (event, val) => {
        if (!intersectionBy([val[val?.length - 1]], value, 'value').length) {
            setOptionsValue(val);
        }
        onChange(event, val);
    };

    return (
        <AsyncAutocomplete
            label={propsLabel}
            className={classNames(className)}
            onChange={onChangeHandler}
            value={uniqBy([...value], 'value')}
            multiple={multiple}
            defaultValue={value}
            getThrottle={getThrottle}
            createOptions={createOptions}
            options={options}
            convertTitleCaseIfNew={convertTitleCaseIfNew}
        />
    );
};

BaseInputAutocomplete.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    convertTitleCaseIfNew: PropTypes.bool,
};

BaseInputAutocomplete.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
    multiple: true,
    label: '',
    options: [],
    convertTitleCaseIfNew: true,
};

export default BaseInputAutocomplete;
