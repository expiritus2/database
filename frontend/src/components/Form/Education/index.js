import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { HIGH_EDUCATION, SECONDARY_EDUCATION } from 'settings/constants/education';
import { Select } from 'components/index';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Education = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.education, className)}>
            <Select
                name={name}
                label={translate.Education}
                options={Education.options(translate)}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

Education.options = (translate) => [
    { id: HIGH_EDUCATION, label: translate.HighEducation, value: HIGH_EDUCATION },
    { id: SECONDARY_EDUCATION, label: translate.SecondaryEducation, value: SECONDARY_EDUCATION },
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
