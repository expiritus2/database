import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Tab = ({ testid, label, onClick, isActive, direction, className, activeTabClassName, icon }) => (
    <div
        key={label}
        className={classNames(
            styles.tab,
            styles[direction],
            { [activeTabClassName || styles.active]: isActive },
            className,
        )}
        onClick={onClick}
        testid={testid}
    >
        {icon}
        {label}
    </div>
);

Tab.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    direction: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeTabClassName: PropTypes.string,
    icon: PropTypes.object || PropTypes.function,
    testid: PropTypes.string,
};

Tab.defaultProps = {
    isActive: false,
    className: '',
    activeTabClassName: '',
    icon: null,
    testid: undefined,
};

export default Tab;
