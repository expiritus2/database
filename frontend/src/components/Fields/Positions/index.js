import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Select } from 'components/Form';
import { useTranslate } from 'hooks';
import { getVocabularyPositionsSelector } from 'store/selectors/vocabulary';
import { getVocabularyPositionsEffect } from 'store/effects/vocabulary';

import styles from './styles.module.scss';

const Positions = (props) => {
    const { className, onChange, value, error } = props;
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
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

Positions.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
};

Positions.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
    error: undefined,
};

export default Positions;
