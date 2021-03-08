import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CgSoftwareDownload } from 'react-icons/cg';
import { OptionsPopup } from 'components';
import Typography from '@material-ui/core/Typography';
import { GrDocumentCsv } from 'react-icons/gr';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useOutsideClick } from 'hooks';

import styles from './styles.module.scss';

const File = (props) => {
    const { className, file, onDelete } = props;
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [currentRef, setCurrentRef] = useState(null);

    const csvRef = useRef();
    const filePlaceholderRef = useRef();
    const popupRef = useRef();

    useOutsideClick([popupRef], () => setOptionsOpen(false));

    const onClickFileIcon = (event, curRef) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentRef(curRef);
        setOptionsOpen(!optionsOpen);
    };

    const getIcon = () => {
        if (file.name.endsWith('.csv')) {
            return (
                <div ref={csvRef}>
                    <GrDocumentCsv
                        onClick={(event) => onClickFileIcon(event, csvRef)}
                        className={classNames(styles.fileIcon, styles.csv)}
                    />
                </div>
            );
        }
        return (
            <div ref={filePlaceholderRef}>
                <AiOutlineFileImage
                    onClick={(event) => onClickFileIcon(event, filePlaceholderRef)}
                    className={styles.filePlaceholder}
                />
            </div>
        );
    };

    const onDownload = () => {

    };

    const onDeleteHandler = (event) => {
        onDelete(event);
        setOptionsOpen(false);
    };

    return (
        <div className={classNames(styles.file, className)}>
            {getIcon()}
            <OptionsPopup ref={popupRef} parentRef={currentRef} open={optionsOpen}>
                <div className={styles.actions}>
                    <ul className={styles.list}>
                        <li className={styles.option} onClick={onDeleteHandler}>
                            <FaTrashAlt className={classNames(styles.icon, styles.trash)} />
                            <Typography>Remove</Typography>
                        </li>
                        <li className={styles.option} onClick={onDownload}>
                            <CgSoftwareDownload className={styles.icon} />
                            <Typography>Download</Typography>
                        </li>
                    </ul>
                </div>
            </OptionsPopup>
        </div>
    );
};

File.propTypes = {
    className: PropTypes.string,
    file: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func,
};

File.defaultProps = {
    className: '',
    onDelete: () => {},
};

export default File;
