import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NameText, Main, Meta } from 'components';
import { FaEye } from 'react-icons/fa';
import Positions from '../Positions';
import Skills from '../Skills';
import Regions from '../Regions';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, nameLat, positions, skills, regions, inActiveSearch } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: inActiveSearch })} />
            <div>
                <Main>
                    <NameText>{name}</NameText>
                    <p>{nameLat}</p>
                </Main>
                <Meta>
                    <Positions positions={positions} />
                    <Skills skills={skills} />
                    <Regions regions={regions} />
                </Meta>
            </div>
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
