import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Input } from 'components';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyPositionsSelector } from 'store/selectors/vocabulary';
import { titleCase } from 'helpers';

import { snakeCase, uniqBy } from 'lodash-es';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { getVocabularyPositionsEffect } from 'store/effects/vocabulary';

import styles from './styles.module.scss';

const cyrillicToTranslit = new CyrillicToTranslit();

const filter = createFilterOptions();

const VacancyName = (props) => {
    const { value, className, onChange } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const positions = useSelector(getVocabularyPositionsSelector);
    const [valueVal, setValue] = useState(value);

    useEffect(() => {
        dispatch(getVocabularyPositionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    const onChangeHandler = (event, newValue) => {
        if (typeof newValue === 'string') {
            setValue({ label: newValue });
        } else if (newValue && newValue.inputValue) {
            setValue({ label: newValue.inputValue });
        } else {
            setValue(newValue);
        }
        onChange(event, newValue);
    };

    const filterOptions = (options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new valueVal
        if (params.inputValue !== '' && !filtered?.length) {
            filtered.push({
                label: titleCase(params.inputValue),
                value: snakeCase(cyrillicToTranslit.transform(params.inputValue)),
            });
        }

        return filtered;
    };

    const getOptionsLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }

        if (option.label) {
            return option.label;
        }

        if (option.value) {
            return option.value;
        }

        return '';
    };

    return (
        <Autocomplete
            className={classNames(styles.input, className)}
            value={valueVal}
            onChange={onChangeHandler}
            filterOptions={filterOptions}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={uniqBy([...positions, ...(valueVal ? [valueVal] : [])], 'value')}
            getOptionLabel={getOptionsLabel}
            getOptionSelected={(option, val) => option?.value === val?.value}
            renderOption={(option) => option.label}
            renderInput={(params) => <Input {...params} label={translate.VacancyName} />}
        />
    );
};

VacancyName.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    }),
    label: PropTypes.string,
    onChange: PropTypes.func,
};

VacancyName.defaultProps = {
    className: '',
    value: {},
    label: '',
    onChange: () => {},
};

export default VacancyName;
