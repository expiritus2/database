import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Autocomplete } from 'components/index';
import styles from './styles.module.scss';

const Place = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();

    const getDefaultValue = useCallback(() => value.map((val) => {
        if (val?.value) return val;
        return Place.options(translate).find((option) => option?.value === val);
    }), []); // eslint-disable-line

    return (
        <div className={classNames(styles.placeWrapper, className)}>
            <Autocomplete
                multiple
                label={translate.Place}
                options={Place.options(translate)}
                onChange={onChange}
                defaultValue={getDefaultValue()}
                getOptionSelected={(option, val) => option?.value === val?.value}
                filterSelectedOptions
            />
        </div>
    );
};

Place.options = (translate) => [
    { label: translate.Remote, value: 'remote' },
    { label: translate.Office, value: 'office' },
];

Place.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

Place.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Place;
