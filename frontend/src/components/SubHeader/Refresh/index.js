import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MdRefresh } from 'react-icons/md';

import styles from './styles.module.scss';

const Refresh = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.refresh, className)}>
            <MdRefresh className={styles.icon} />
        </div>
    );
};

Refresh.propTypes = {
    className: PropTypes.string,
};

Refresh.defaultProps = {
    className: '',
};

export default Refresh;
