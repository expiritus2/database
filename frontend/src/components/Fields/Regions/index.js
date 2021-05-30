import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularyRegionsEffect } from 'store/effects/vocabulary';
import { Select } from 'components/Form';
import { useTranslate } from 'hooks';
import { getVocabularyRegionsSelector } from 'store/selectors/vocabulary';

const Regions = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { regions } = useSelector(getVocabularyRegionsSelector);

    useEffect(() => {
        dispatch(getVocabularyRegionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(className)}>
            <Select
                multiple
                search
                label={translate.Regions}
                onChange={onChange}
                value={value}
                options={regions}
            />
        </div>
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
