import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import { getVocabularyActivitiesSelector } from 'store/selectors/vocabulary';
import { getVocabularyActivitiesEffect } from 'store/effects/vocabulary';

import styles from './styles.module.scss';

const Activities = (props) => {
    const { className, onChange, value, error } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const { activities } = useSelector(getVocabularyActivitiesSelector);

    useEffect(() => {
        dispatch(getVocabularyActivitiesEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.activities, className)}>
            <Select
                multiple
                search
                label={translate.Activities}
                onChange={onChange}
                value={value}
                options={activities}
            />
            <div className={styles.error}>{error}</div>
        </div>
    );
};

Activities.options = (translate) => [
    { label: translate.Remote, value: 'remote' },
    { label: translate.Office, value: 'office' },
];

Activities.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
    error: PropTypes.string,
};

Activities.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
    error: '',
};

export default Activities;
