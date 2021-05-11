import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const WorkTypes = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.workTypes, className)}>
            WorkTypes
        </div>
    );
};

WorkTypes.propTypes = {
    className: PropTypes.string,
};

WorkTypes.defaultProps = {
    className: '',
};

export default WorkTypes;
