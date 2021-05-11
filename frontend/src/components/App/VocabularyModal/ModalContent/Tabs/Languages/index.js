import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Languages = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.languages, className)}>
            Languages
        </div>
    );
};

Languages.propTypes = {
    className: PropTypes.string,
};

Languages.defaultProps = {
    className: '',
};

export default Languages;
