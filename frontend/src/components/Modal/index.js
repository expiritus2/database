import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '@material-ui/core/Modal';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';

import styles from './styles.module.scss';

const ModalComponent = (props) => {
    const { className, children, open, onClose, closeAfterTransition, title } = props;
    const { cardClassName, cardHeaderClassName, cardContentClassName, cardActionsClassName } = props;
    const { actionsChildren } = props;

    return (
        <Modal
            className={classNames(styles.modal, className)}
            open={open}
            onClose={onClose}
            closeAfterTransition={closeAfterTransition}
        >
            <Card className={classNames(styles.card, cardClassName)}>
                <CardHeader
                    className={cardHeaderClassName}
                    title={title}
                    action={(
                        <IconButton onClick={onClose} aria-label="settings">
                            <Close />
                        </IconButton>
                    )}
                />
                <CardContent className={classNames(styles.cardContent, cardContentClassName)}>
                    {children}
                </CardContent>
                {actionsChildren && (
                    <CardActions className={classNames(styles.actions, cardActionsClassName)}>
                        {actionsChildren}
                    </CardActions>
                )}
            </Card>
        </Modal>
    );
};

ModalComponent.propTypes = {
    className: PropTypes.string,
    cardClassName: PropTypes.string,
    cardHeaderClassName: PropTypes.string,
    cardContentClassName: PropTypes.string,
    cardActionsClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeAfterTransition: PropTypes.bool,
    actionsChildren: PropTypes.node,
    title: PropTypes.string,
};

ModalComponent.defaultProps = {
    className: '',
    cardClassName: '',
    cardHeaderClassName: '',
    cardActionsClassName: '',
    cardContentClassName: '',
    onClose: PropTypes.func,
    closeAfterTransition: true,
    actionsChildren: undefined,
    title: '',
};

export default ModalComponent;
