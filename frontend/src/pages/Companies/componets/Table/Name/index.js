import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaEye } from 'react-icons/fa';
import { TableMain, TableMeta, NameText, TableActivities } from 'components';
import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, active, activities } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <TableMain className={styles.main}>
                    <NameText>{name}</NameText>
                </TableMain>
                <TableMeta>
                    <TableActivities list={activities} />
                </TableMeta>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    activities: PropTypes.arrayOf(PropTypes.shape({})),
};

Name.defaultProps = {
    className: '',
    active: false,
    activities: [],
};

export default Name;
