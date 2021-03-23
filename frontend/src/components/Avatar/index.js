import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultImage from 'images/default-profile-pic.png';

import styles from './styles.module.scss';

const Avatar = (props) => {
    const { src, className } = props;

    return (
        <div className={classNames(styles.avatar, className)}>
            <img src={src || DefaultImage} alt="" />
        </div>
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
};

Avatar.defaultProps = {
    className: '',
    src: null,
};

export default Avatar;
