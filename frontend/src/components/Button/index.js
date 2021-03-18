import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Spinner } from 'components';

import styles from './styles.module.scss';

const ButtonComponent = (props) => {
    const { children, isPending, loaderClassName, variant, className, onClick, ...otherProps } = props;

    const onClickHandler = (event) => {
        if (!isPending) {
            onClick(event);
        }
    };

    return (
        <Button
            variant={variant}
            className={classNames(styles.button, className)}
            onClick={onClickHandler}
            {...otherProps}
        >
            {isPending ? <Spinner loaderClassName={styles.spinner} /> : children}
        </Button>
    );
};

ButtonComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isPending: PropTypes.bool,
    loaderClassName: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
    className: '',
    isPending: false,
    loaderClassName: '',
    variant: 'contained',
    onClick: () => {},
};

export default ButtonComponent;
