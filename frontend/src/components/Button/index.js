import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { Spinner } from 'components';

import styles from './styles.module.scss';

const ButtonComponent = ({ children, isPending, loaderClassName, ...props }) => (
    <Button {...props}>
        {isPending ? <Spinner loaderClassName={styles.spinner} /> : children}
    </Button>
);

ButtonComponent.propTypes = {
    children: PropTypes.node.isRequired,
    isPending: PropTypes.bool,
    loaderClassName: PropTypes.string,
};

ButtonComponent.defaultProps = {
    isPending: false,
    loaderClassName: '',
};

export default ButtonComponent;
