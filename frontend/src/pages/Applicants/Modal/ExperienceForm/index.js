import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const ExperienceForm = ({ className }) => (
    <ContentWrapper className={classNames(styles.wrapper, className)}>
        Experience
    </ContentWrapper>
);

ExperienceForm.propTypes = {
    className: PropTypes.string,
};

ExperienceForm.defaultProps = {
    className: '',
};

export default ExperienceForm;
