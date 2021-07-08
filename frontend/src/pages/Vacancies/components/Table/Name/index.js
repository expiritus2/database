import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaEye } from 'react-icons/fa';
import { TableMain, TableMeta, TableSkills, TableRegions, TableCompany } from 'components';
import Position from '../Position';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, active, position, skills, regions, company } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <TableMain>
                    <Position label={position?.label} />
                </TableMain>
                <TableMeta>
                    <TableCompany name={company?.name} />
                    <TableSkills list={skills} />
                    <TableRegions list={regions} />
                </TableMeta>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    position: PropTypes.shape(({
        label: PropTypes.string,
    })),
    skills: PropTypes.arrayOf(PropTypes.shape({})),
    regions: PropTypes.arrayOf(PropTypes.shape({})),
    active: PropTypes.bool.isRequired,
    company: PropTypes.shape({
        name: PropTypes.string,
    }),
};

Name.defaultProps = {
    className: '',
    position: '',
    skills: [],
    regions: [],
    company: '',
};

export default Name;
