import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Skills = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.wrapper, className)}>
            Skills
        </div>
    );
};

Skills.propTypes = {
    className: PropTypes.string,
};

Skills.defaultProps = {
    className: '',
};

export default Skills;
