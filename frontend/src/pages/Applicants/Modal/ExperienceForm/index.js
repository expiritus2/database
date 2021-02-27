import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const ExperienceForm = ({ className }) => (
    <div className={classNames(styles.wrapper, className)}>
        Experience
    </div>
);

ExperienceForm.propTypes = {
    className: PropTypes.string,
};

ExperienceForm.defaultProps = {
    className: '',
};

export default ExperienceForm;
