/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Skills = (props) => {
    const { className, skills } = props;
    const { translate } = useTranslate();

    if (!skills || !skills.length) return null;

    return (
        <div className={classNames(styles.skills, className)}>
            <InfoItem
                label={translate.Skills}
                value={skills.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

Skills.propTypes = {
    className: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })).isRequired,
};

Skills.defaultProps = {
    className: '',
};

export default Skills;
