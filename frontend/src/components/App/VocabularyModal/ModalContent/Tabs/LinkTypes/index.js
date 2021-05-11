import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const LinkTypes = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.languages, className)}>
            LinkTypes
        </div>
    );
};

LinkTypes.propTypes = {
    className: PropTypes.string,
};

LinkTypes.defaultProps = {
    className: '',
};

export default LinkTypes;
