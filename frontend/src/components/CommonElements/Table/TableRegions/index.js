import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableItem } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const TableRegions = (props) => {
    const { list, className } = props;
    const { translate } = useTranslate();

    const getValue = () => list.map((item) => item?.label).join(', ');

    return (
        <div className={classNames(styles.regions, className)}>
            <TableItem label={`${translate.Regions}: `} value={getValue()} />
        </div>
    );
};

TableRegions.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TableRegions.defaultProps = {
    className: '',
};

export default TableRegions;
