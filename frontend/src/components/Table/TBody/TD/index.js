import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../../styles.module.scss';

const TD = ({ width, value, cellClassName }) => (
    <td style={{ width }} className={classNames(styles.cell, cellClassName)}>
        <div>{value}</div>
    </td>
);

TD.propTypes = {
    cellClassName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
    width: PropTypes.string,
};

TD.defaultProps = {
    cellClassName: '',
    width: undefined,
};

export default TD;
