import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Positions from '../Positions';
import Skills from '../Skills';
import Regions from '../Regions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, nameLat, positions, skills, regions } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <h5>{name}</h5>
            <p>{nameLat}</p>
            <Positions positions={positions} />
            <Skills skills={skills} />
            <Regions regions={regions} />
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    nameLat: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    regions: PropTypes.arrayOf(PropTypes.string),
};

Name.defaultProps = {
    className: '',
    nameLat: '',
    positions: [],
    skills: [],
    regions: [],
};

export default Name;
