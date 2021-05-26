import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyPositionsSelector } from 'store/selectors/vocabulary';
import { getVocabularyPositionsEffect } from 'store/effects/vocabulary';

import { Select } from '../../Form-NEW';

const VacancyName = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { positions } = useSelector(getVocabularyPositionsSelector);

    useEffect(() => {
        dispatch(getVocabularyPositionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(className)}>
            <Select
                multiple={false}
                search
                label={translate.Position}
                variant={Select.LIGHT_FULL}
                onChange={onChange}
                value={value}
                options={positions}
            />
        </div>
    );
};

VacancyName.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    }),
    onChange: PropTypes.func,
};

VacancyName.defaultProps = {
    className: '',
    value: {},
    onChange: () => {},
};

export default VacancyName;
