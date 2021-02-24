import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'components';

const PendingWrapper = ({ isPending, className, spinnerClassname, children, loaderClassName }) => (
    <div className={className}>
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
