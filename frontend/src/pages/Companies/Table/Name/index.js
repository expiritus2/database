import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaEye } from 'react-icons/fa';
import { TableMain, TableMeta, NameText } from 'components';
import styles from './styles.module.scss';

const Name = (props) => {
    const { className, name, active, activities } = props;

    return (
        <div className={classNames(styles.name, className)}>
            <FaEye className={classNames(styles.activeIcon, { [styles.active]: active })} />
            <div>
                <TableMain>
                    <NameText>{name}</NameText>
                </TableMain>
                <TableMeta>
                    <div>
                        {(activities || []).map((activity) => (
                            <div key={activity.id} className={styles.activity}>{activity?.label}</div>
                        ))}
                    </div>
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
