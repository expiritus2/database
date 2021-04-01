import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PaginationControls from './PaginationControlls';
import DisplayControls from './DisplayControls';

import styles from './styles.module.scss';

const PaginationComponent = (props) => {
    const { className, count, onChangePage, page } = props;
    const [rowsPerPageValue, setRowsPerPageValue] = useState(10);
    const [pageValue, setPageValue] = useState(page);

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
        setPageValue(0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, pageValue - 1);
        setPageValue(pageValue - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, pageValue + 1);
        setPageValue(pageValue + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPageValue) - 1));
        setPageValue(Math.max(0, Math.ceil(count / rowsPerPageValue) - 1));
    };

    const onChangeCountPerPage = (event) => {
        setRowsPerPageValue(+event.target.value);
    };

    return (
        <div className={classNames(styles.pagination, className)}>
            <PaginationControls
                handleFirstPageButtonClick={handleFirstPageButtonClick}
                handleBackButtonClick={handleBackButtonClick}
                handleNextButtonClick={handleNextButtonClick}
                handleLastPageButtonClick={handleLastPageButtonClick}
                page={pageValue}
                count={count}
                rowsPerPage={rowsPerPageValue}
            />
            <DisplayControls
                page={pageValue}
                count={count}
                rowsPerPage={rowsPerPageValue}
                onChangeCountPerPage={onChangeCountPerPage}
            />
        </div>
    );
};

PaginationComponent.propTypes = {
    className: PropTypes.string,
    onChangePage: PropTypes.func,
    count: PropTypes.number,
    page: PropTypes.number,
};

PaginationComponent.defaultProps = {
    className: '',
    onChangePage: () => {},
    count: null,
    page: 0,
};

export default PaginationComponent;
