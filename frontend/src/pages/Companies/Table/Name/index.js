import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaEye } from 'react-icons/fa';
import { Main, Meta, NameText } from 'components';
import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, active } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <Main>
                    <NameText>{name}</NameText>
                </Main>
                <Meta>
                    meta
                </Meta>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    active: false,
};

export default Name;
