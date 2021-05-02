import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaEye } from 'react-icons/fa';
import Position from '../Position';
import Skills from '../Skills';
import Regions from '../Regions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, active, position, skills, regions } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <Position position={position} />
                <Skills className={styles.skills} skills={skills} />
                <Regions regions={regions} />
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    regions: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool.isRequired,
};

Name.defaultProps = {
    className: '',
    position: '',
    skills: [],
    regions: [],
};

export default Name;
