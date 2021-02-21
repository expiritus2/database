import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from 'components';

const Wrapper = ({ isPending, className, spinnerClassname, children, loaderClassName }) => (
    <div className={className}>
        {isPending ? <Spinner className={spinnerClassname} loaderClassName={loaderClassName} /> : children}
    </div>
);

Wrapper.propTypes = {
    className: PropTypes.string,
    spinnerClassname: PropTypes.string,
    isPending: PropTypes.bool.isRequired,
    children: PropTypes.node,
    loaderClassName: PropTypes.string,
};

Wrapper.defaultProps = {
    className: '',
    spinnerClassname: '',
    children: undefined,
    loaderClassName: '',
};

export default Wrapper;
