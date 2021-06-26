import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NameText } from 'components';
import styles from './styles.module.scss';

const Position = (props) => {
    const { position, className } = props;

    return (
        <div className={classNames(styles.position, className)}>
            <NameText>{position}</NameText>
        </div>
    );
};

Position.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string.isRequired,
};

Position.defaultProps = {
    className: '',
};

export default Position;
