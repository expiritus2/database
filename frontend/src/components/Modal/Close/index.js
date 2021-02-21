import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Close = ({ className, onClose }) => (
    <div testid="modal_close" onClick={onClose} className={classNames(styles.close, className)}>
        <span className={styles.closeLineOne} />
        <span className={styles.closeLineTwo} />
    </div>
);

Close.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
};

Close.defaultProps = {
    className: '',
    onClose: () => {},
};

export default Close;
