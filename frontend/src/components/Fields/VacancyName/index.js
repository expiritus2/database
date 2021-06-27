import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyPositionsSelector } from 'store/selectors/vocabulary';
import { getVocabularyPositionsEffect } from 'store/effects/vocabulary';

import { Select } from 'components/Form';

import styles from './styles.module.scss';

const VacancyName = (props) => {
    const { className, onChange, value, error } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { positions } = useSelector(getVocabularyPositionsSelector);

    useEffect(() => {
        dispatch(getVocabularyPositionsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.vacancyName, className)}>
            <Select
                multiple={false}
                search
                label={translate.Position}
                onChange={onChange}
                value={value}
                options={positions}
            />
            {error && <div className={styles.error}>{error}</div>}
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
    error: PropTypes.string,
};

VacancyName.defaultProps = {
    className: '',
    value: {},
    onChange: () => {},
    error: undefined,
};

export default VacancyName;
