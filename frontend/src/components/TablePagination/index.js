import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TablePagination from '@material-ui/core/TablePagination';

import styles from './styles.module.scss';

const PaginationComponent = (props) => {
    const { className, rowsPerPage, page, onChangePage, onChangeRowsPerPage } = props;

    return (
        <div className={classNames(styles.pagination, className)}>
            <TablePagination
                component="div"
                count={100}
                page={page}
                onChangePage={onChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
        </div>
    );
};

PaginationComponent.propTypes = {
    className: PropTypes.string,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
};

PaginationComponent.defaultProps = {
    className: '',
    rowsPerPage: 10,
    page: 1,
    onChangePage: () => {},
    onChangeRowsPerPage: () => {},
};

export default PaginationComponent;
