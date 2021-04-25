import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaEye } from 'react-icons/fa';
import Positions from '../Positions';
import Skills from '../Skills';
import Regions from '../Regions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, active, positions, skills, regions } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <Positions positions={positions} />
                <Skills className={styles.skills} skills={skills} />
                <Regions regions={regions} />
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    regions: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool.isRequired,
};

Name.defaultProps = {
    className: '',
    positions: [],
    skills: [],
    regions: [],
};

export default Name;
