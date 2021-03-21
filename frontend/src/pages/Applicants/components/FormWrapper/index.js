import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const FormWrapper = ({ className, children }) => (
    <div className={classNames(styles.formWrapper, className)}>
        {children}
    </div>
);

FormWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

FormWrapper.defaultProps = {
    className: '',
};

export default FormWrapper;
