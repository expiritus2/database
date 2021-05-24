import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BASE_EDUCATION, HIGH_EDUCATION, MIDDLE_EDUCATION, MIDDLE_SPECIAL_EDUCATION, NOT_FINISH_HIGH_EDUCATION } from 'settings/constants/education';
import { Select } from 'components/Form-NEW';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Education = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.education, className)}>
            <Select
                name={name}
                variant={Select.LIGHT_FULL}
                label={translate.Education}
                options={Education.options(translate)}
                value={value?.trim()}
                onChange={onChange}
            />
        </div>
    );
};

Education.options = (translate) => [
    { id: BASE_EDUCATION, label: translate.BaseEducation, value: BASE_EDUCATION },
    { id: HIGH_EDUCATION, label: translate.HighEducation, value: HIGH_EDUCATION },
    { id: NOT_FINISH_HIGH_EDUCATION, label: translate.NotFinishHighEducation, value: NOT_FINISH_HIGH_EDUCATION },
    { id: MIDDLE_EDUCATION, label: translate.MiddleEducation, value: MIDDLE_EDUCATION },
    { id: MIDDLE_SPECIAL_EDUCATION, label: translate.MiddleSpecialEducation, value: MIDDLE_SPECIAL_EDUCATION },
];

Education.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
};

Education.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    name: undefined,
};

export default Education;
