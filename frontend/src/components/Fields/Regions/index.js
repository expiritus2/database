import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularyRegionsEffect } from 'store/effects/vocabulary';
import { Select } from 'components/Form';
import { useTranslate } from 'hooks';
import { getVocabularyRegionsSelector } from 'store/selectors/vocabulary';

import styles from './styles.module.scss';

const Regions = (props) => {
    const { className, onChange, value, error } = props;
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
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
};

Regions.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
    error: undefined,
};

export default Regions;
