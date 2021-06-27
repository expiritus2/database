import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyWorkSchedulesEffect } from 'store/effects/vocabulary';
import { getVocabularyWorkSchedulesSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import styles from './styles.module.scss';

const WorkSchedules = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { workSchedules } = useSelector(getVocabularyWorkSchedulesSelector);

    useEffect(() => {
        dispatch(getVocabularyWorkSchedulesEffect());
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.workSchedule, className)}>
            <Select
                multiple
                search
                label={translate.WorkSchedule}
                onChange={onChange}
                value={value}
                options={workSchedules}
            />
        </div>
    );
};

WorkSchedules.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

WorkSchedules.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default WorkSchedules;
