import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const HintContent = ({ children }) => (
    <div className={classNames(styles.hintContent, 'hintContent')}>
        {children}
    </div>
);

HintContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HintContent;
