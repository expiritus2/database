import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaEye } from 'react-icons/fa';
import { TableMain, TableMeta } from 'components';
import Position from '../Position';
import Skills from '../Skills';
import Regions from '../Regions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, active, position, skills, regions, company } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <TableMain>
                    <Position position={position} />
                </TableMain>
                <TableMeta>
                    <div className={styles.company}>{company}</div>
                    <Skills skills={skills} />
                    <Regions regions={regions} />
                </TableMeta>
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
    company: PropTypes.string,
};

Name.defaultProps = {
    className: '',
    position: '',
    skills: [],
    regions: [],
    company: '',
};

export default Name;
