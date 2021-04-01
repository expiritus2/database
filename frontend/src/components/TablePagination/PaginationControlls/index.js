import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import styles from './styles.module.scss';

const PaginationControls = (props) => {
    const { className, handleFirstPageButtonClick, page, handleBackButtonClick } = props;
    const { handleNextButtonClick, handleLastPageButtonClick, count, rowsPerPage } = props;

    if (!count) return null;

    return (
        <div className={classNames(styles.paginationControls, className)}>
            <div>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
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
