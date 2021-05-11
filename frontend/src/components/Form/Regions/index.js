import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { getVocabularyRegionsEffect } from 'store/effects/vocabulary';
import { BaseAutocomplete } from 'components/index';
import { useTranslate } from 'hooks';

const Regions = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();

    useEffect(() => {
        dispatch(getVocabularyRegionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <BaseAutocomplete
            label={translate.Regions}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={[]}
        />
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Regions.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Regions;
