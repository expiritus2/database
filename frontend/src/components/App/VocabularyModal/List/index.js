import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useOutsideClick, useTranslate } from 'hooks';
import { ActionList } from 'components';

import styles from './styles.module.scss';

const List = (props) => {
    const { className, list, onEdit, onDelete } = props;
    const [actionsPosition, setActionsPosition] = useState(null);
    const [closeActions, setCloseActions] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { translate } = useTranslate();
    const listRef = useRef();

    useOutsideClick([listRef], () => {
        setCloseActions(true);
        setCurrentItem(null);
    });

    const onEditHandler = () => {
        setCurrentItem(null);
        setActionsPosition(null);
        onEdit(currentItem);
    };

    const onDeleteHandler = () => {
        setCurrentItem(null);
        setActionsPosition(null);
        onDelete(currentItem);
    };

    const onClickHandler = (event, item) => {
        setActionsPosition({ x: event?.clientX, y: event?.clientY });
        setCloseActions(false);
        setCurrentItem(item);
    };

    const getActions = () => [
        { id: 'edit', title: translate.Edit, onClick: onEditHandler },
        { id: 'delete', title: translate.Delete, onClick: onDeleteHandler },
    ];

    return (
        <div className={classNames(styles.list, className)}>
            <ul>
                {list.map((item, index) => (
                    <li
                        className={styles.item}
                        onClick={(event) => onClickHandler(event, item)}
                        key={item?.id || index}
                    >
                        {item?.label}
                    </li>
                ))}
            </ul>
            <ActionList ref={listRef} actions={getActions()} position={actionsPosition} close={closeActions} />
        </div>
    );
};

List.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

List.defaultProps = {
    className: '',
    list: [],
    onEdit: () => {},
    onDelete: () => {},
};

export default List;
