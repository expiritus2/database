import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NameText, TableMain, TableMeta, TablePositions, TableSkills, TableRegions } from 'components';
import { FaEye } from 'react-icons/fa';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, nameLat, positions, skills, regions, inActiveSearch } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: inActiveSearch })} />
            <div>
                <TableMain>
                    <NameText>{name}</NameText>
                    <NameText className={styles.nameLat}>{nameLat}</NameText>
                </TableMain>
                <TableMeta>
                    <TablePositions list={positions} />
                    <TableSkills list={skills} />
                    <TableRegions list={regions} />
                </TableMeta>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    nameLat: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.shape({})),
    skills: PropTypes.arrayOf(PropTypes.shape({})),
    regions: PropTypes.arrayOf(PropTypes.shape({})),
    inActiveSearch: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    nameLat: '',
    positions: [],
    skills: [],
    regions: [],
    inActiveSearch: false,
};

export default Name;
