import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { Spinner } from 'components';

import styles from './styles.module.scss';

const ButtonComponent = (props) => {
    const { children, isPending, loaderClassName, variant, ...otherProps } = props;

    return (
        <Button variant={variant} {...otherProps}>
            {isPending ? <Spinner loaderClassName={styles.spinner} /> : children}
        </Button>
    );
};

ButtonComponent.propTypes = {
    children: PropTypes.node.isRequired,
    isPending: PropTypes.bool,
    loaderClassName: PropTypes.string,
    variant: PropTypes.string,
};

ButtonComponent.defaultProps = {
    isPending: false,
    loaderClassName: '',
    variant: 'contained',
};

export default ButtonComponent;
