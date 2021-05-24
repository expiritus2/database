import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Select } from 'components/Form-NEW';
import { useTranslate } from 'hooks';
import { getVocabularyPositionsSelector } from 'store/selectors/vocabulary';
import { getVocabularyPositionsEffect } from 'store/effects/vocabulary';

const Position = (props) => {
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
                multiple
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
