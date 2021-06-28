import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableItem } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Skills = (props) => {
    const { skills, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.skills, className)}>
            <TableItem label={`${translate.Skills}: `} value={skills.join(', ')} />
        </div>
    );
};

Skills.propTypes = {
    className: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Skills.defaultProps = {
    className: '',
};

export default Skills;
