import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Spinner } from 'components/index';

import styles from './styles.module.scss';

const PendingWrapper = ({ isPending, className, spinnerClassname, children, loaderClassName }) => (
    <div className={classNames(className, styles.pendingWrapper)}>
        {isPending ? <Spinner className={spinnerClassname} loaderClassName={loaderClassName} /> : children}
    </div>
);

PendingWrapper.propTypes = {
    className: PropTypes.string,
    spinnerClassname: PropTypes.string,
    isPending: PropTypes.bool.isRequired,
    children: PropTypes.node,
    loaderClassName: PropTypes.string,
};

PendingWrapper.defaultProps = {
    className: '',
    spinnerClassname: '',
    children: undefined,
    loaderClassName: '',
};

export default PendingWrapper;
