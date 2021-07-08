import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableItem } from 'components';
import styles from './styles.module.scss';

const TableCompany = (props) => {
    const { name, className } = props;

    if (!name) return null;

    return (
        <div className={classNames(styles.company, className)}>
            <TableItem label="" value={name} />
        </div>
    );
};

TableCompany.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
};

TableCompany.defaultProps = {
    className: '',
    name: null,
};

export default TableCompany;
