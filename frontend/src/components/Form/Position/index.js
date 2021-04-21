import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { BaseAutocomplete } from 'components';
import { useTranslate } from 'hooks';
import { getResourcesPositionsSelector } from 'store/selectors/resources';
import { getVocabularyPositionsEffect } from 'store/effects/resources';

const Position = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const positions = useSelector(getResourcesPositionsSelector);

    useEffect(() => {
        dispatch(getVocabularyPositionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <BaseAutocomplete
            label={translate.Position}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={positions}
        />
    );
};

Position.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Position.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Position;
