import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaEye } from 'react-icons/fa';
import { NameText, TableMain, TableMeta, TablePositions } from 'components';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, positions, active, company } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <TableMain className={styles.main}>
                    <NameText>{name}</NameText>
                </TableMain>
                <TableMeta className={styles.meta}>
                    <div className={styles.companyName}>{company?.name}</div>
                    <div className={styles.separator}>/</div>
                    <TablePositions list={positions} />
                </TableMeta>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(PropTypes.shape({})),
    active: PropTypes.bool,
    company: PropTypes.shape({
        name: PropTypes.string,
    }),
};

Name.defaultProps = {
    className: '',
    positions: [],
    active: false,
    company: null,
};

export default Name;
