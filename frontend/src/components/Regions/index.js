import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AsyncAutocomplete } from 'components';
import { intersectionBy, uniqBy } from 'lodash-es';

import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Regions = (props) => {
    const { className, onChange, value, multiple } = props;
    const [options, setOptions] = useState([]);

    const { translate } = useTranslate();

    const createOptions = (arr) => arr.map(({ label, value: val }) => ({
        label, value: val,
    }));

    const getRegions = useMemo(() => () => new Promise((resolve) => {
        resolve({
            data: [...value, ...options],
        });
    }), [options, value]);

    const onChangeHandler = (event, val) => {
        if (!intersectionBy([val[val?.length - 1]], value, 'value').length) {
            setOptions(val);
        }
        onChange(event, val);
    };

    return (
        <AsyncAutocomplete
            label={translate.Regions}
            className={classNames(styles.position, className)}
            onChange={onChangeHandler}
            value={uniqBy([...value, ...options], 'value')}
            multiple={multiple}
            defaultValue={value}
            getThrottle={getRegions}
            createOptions={createOptions}
        />
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    multiple: PropTypes.bool,
};

Regions.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    multiple: true,
};

export default Regions;
