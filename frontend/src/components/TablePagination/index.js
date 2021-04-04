import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PaginationControls from './PaginationControlls';
import DisplayControls from './DisplayControls';

import styles from './styles.module.scss';

const PaginationComponent = (props) => {
    const { className, count, onChangePage, onChangeCountPerPage, page } = props;
    const [rowsPerPageValue, setRowsPerPageValue] = useState(25);
    const [pageValue, setPageValue] = useState(page);

    useEffect(() => setPageValue(page), [page]);

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0, rowsPerPageValue);
        setPageValue(0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, pageValue - 1, rowsPerPageValue);
        setPageValue(pageValue - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, pageValue + 1, rowsPerPageValue);
        setPageValue(pageValue + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPageValue) - 1), rowsPerPageValue);
        setPageValue(Math.max(0, Math.ceil(count / rowsPerPageValue) - 1));
    };

    const onChangeCountPerPageHandler = (event) => {
        const newCountPerPage = +event.target.value;
        onChangeCountPerPage(event, 0, newCountPerPage);
        setPageValue(0);
        setRowsPerPageValue(newCountPerPage);
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
                onChangeCountPerPage={onChangeCountPerPageHandler}
            />
        </div>
    );
};

PaginationComponent.propTypes = {
    className: PropTypes.string,
    onChangePage: PropTypes.func,
    onChangeCountPerPage: PropTypes.func,
    count: PropTypes.number,
    page: PropTypes.number,
};

PaginationComponent.defaultProps = {
    className: '',
    onChangePage: () => {},
    onChangeCountPerPage: () => {},
    count: null,
    page: 0,
};

export default PaginationComponent;
