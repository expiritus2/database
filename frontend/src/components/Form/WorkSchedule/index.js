import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FLEXIBLE_SCHEDULE, FULL_DAY, SHIFT_WORK } from 'settings/constants/workSchedule';
import { Autocomplete } from 'components/index';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const WorkSchedule = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();

    const getDefaultValue = useCallback(() => value.map((val) => {
        if (val?.value) return val;
        return WorkSchedule.options(translate).find((option) => option?.value === val);
    }), []); // eslint-disable-line

    const onChangeHandler = (e, val) => {
        onChange(e, val.map((v) => v?.value));
    };

    return (
        <div className={classNames(styles.workSchedule, className)}>
            <Autocomplete
                multiple
                label={translate.WorkSchedule}
                options={WorkSchedule.options(translate)}
                onChange={onChangeHandler}
                defaultValue={getDefaultValue()}
                getOptionSelected={(option, val) => option?.value === val?.value}
                filterSelectedOptions
            />
        </div>
    );
};

WorkSchedule.options = (translate) => [
    { id: FLEXIBLE_SCHEDULE, label: translate.FlexibleSchedule, value: FLEXIBLE_SCHEDULE },
    { id: FULL_DAY, label: translate.FullDay, value: FULL_DAY },
    { id: SHIFT_WORK, label: translate.ShiftWork, value: SHIFT_WORK },
];

WorkSchedule.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

WorkSchedule.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default WorkSchedule;
