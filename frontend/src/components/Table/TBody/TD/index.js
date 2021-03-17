import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles.module.scss';

const TD = ({ width, value }) => (
    <td style={{ width }} className={styles.cell}>
        <div>{value}</div>
    </td>
);

TD.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
    width: PropTypes.string,
};

TD.defaultProps = {
    width: undefined,
};

export default TD;
