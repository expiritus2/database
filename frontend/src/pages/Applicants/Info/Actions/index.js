import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;

    return (
        <PaddingWrapper className={classNames(styles.actions, className)}>
            Actions
        </PaddingWrapper>
    );
};

Actions.propTypes = {
    className: PropTypes.string,
};

Actions.defaultProps = {
    className: '',
};

export default Actions;
