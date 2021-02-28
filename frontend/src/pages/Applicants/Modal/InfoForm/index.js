import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const InfoForm = ({ className }) => (
    <ContentWrapper className={classNames(styles.wrapper, className)}>
        Info
    </ContentWrapper>
);

InfoForm.propTypes = {
    className: PropTypes.string,
};

InfoForm.defaultProps = {
    className: '',
};

export default InfoForm;
