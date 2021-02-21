import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';
import './styles.scss';

const Spinner = ({ className, loaderClassName }) => (
    <div className={classNames(styles.spinner, className)}>
        <div className={classNames(styles.loader, 'loader', loaderClassName)}>Loading...</div>
    </div>
);

Spinner.propTypes = {
    className: PropTypes.string,
    loaderClassName: PropTypes.string,
};

Spinner.defaultProps = {
    className: '',
    loaderClassName: '',
};

export default Spinner;
