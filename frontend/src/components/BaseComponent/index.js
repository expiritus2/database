import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const BaseComponent = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.wrapper, className)}>
            BaseComponent
        </div>
    );
};

BaseComponent.propTypes = {
    className: PropTypes.string,
};

BaseComponent.defaultProps = {
    className: '',
};

export default BaseComponent;
