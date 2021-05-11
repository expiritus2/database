import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Position = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.position, className)}>
            Position
        </div>
    );
};

Position.propTypes = {
    className: PropTypes.string,
};

Position.defaultProps = {
    className: '',
};

export default Position;
