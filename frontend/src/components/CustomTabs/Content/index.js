import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Content = ({ testid, isActive, children, animation, direction, className }) => {
    if (!isActive) return null;

    return (
        <div
            className={classNames(
                styles.content,
                styles[animation],
                styles[direction],
                { [styles.active]: isActive },
                className,
            )}
            testid={testid}
        >
            {children}
        </div>
    );
};

Content.propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
    animation: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    testid: PropTypes.string,
};

Content.defaultProps = {
    isActive: false,
    className: '',
    testid: undefined,
};

export default Content;
