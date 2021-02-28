import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const FilesForm = ({ className }) => (
    <ContentWrapper className={classNames(styles.wrapper, className)}>
        Files
    </ContentWrapper>
);

FilesForm.propTypes = {
    className: PropTypes.string,
};

FilesForm.defaultProps = {
    className: '',
};

export default FilesForm;
