import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MdFirstPage, MdLastPage, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import styles from './styles.module.scss';

const PaginationControls = (props) => {
    const { className, handleFirstPageButtonClick, page, handleBackButtonClick } = props;
    const { handleNextButtonClick, handleLastPageButtonClick, count, rowsPerPage } = props;

    return (
        <div className={classNames(styles.paginationControls, className)}>
            <div className={styles.holder}>
                <button
                    className={styles.btn}
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    <MdFirstPage />
                </button>
                <button
                    className={styles.btn}
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    <MdKeyboardArrowLeft />
                </button>
                <button
                    className={styles.btn}
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    <MdKeyboardArrowRight />
                </button>
                <button
                    className={styles.btn}
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    <MdLastPage />
                </button>
            </div>
        </div>
    );
};

PaginationControls.propTypes = {
    className: PropTypes.string,
    handleFirstPageButtonClick: PropTypes.func.isRequired,
    handleBackButtonClick: PropTypes.func.isRequired,
    handleNextButtonClick: PropTypes.func.isRequired,
    handleLastPageButtonClick: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number,
};

PaginationControls.defaultProps = {
    className: '',
    count: null,
};

export default PaginationControls;
