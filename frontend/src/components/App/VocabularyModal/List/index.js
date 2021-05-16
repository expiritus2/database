import React, { useState, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useOutsideClick, useTranslate } from 'hooks';
import { ActionList } from 'components';
import Item from './Item';

import styles from './styles.module.scss';

const List = (props) => {
    const { className, list, onUpdate, onDelete } = props;
    const [actionsPosition, setActionsPosition] = useState(null);
    const [closeActions, setCloseActions] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { translate } = useTranslate();
    const actionsRef = useRef();
    const listRef = useRef();

    const resetStates = () => {
        setCloseActions(true);
        setCurrentItem(null);
        setEditMode(false);
        setActionsPosition(null);
    };

    useOutsideClick([actionsRef, listRef], () => {
        resetStates();
    });

    const onEditHandler = useCallback(() => {
        setActionsPosition(null);
        setEditMode(true);
    }, []);

    const onDeleteHandler = useCallback(() => {
        setCurrentItem(null);
        setActionsPosition(null);
        onDelete(currentItem?.item);
    }, [currentItem, onDelete]);

    const onClickHandler = (event, item, index) => {
        setTimeout(() => {
            setActionsPosition({ x: event?.clientX, y: event?.clientY });
            setCloseActions(false);
            setCurrentItem({ item, index });
        }, 100);
    };

    const itemActions = useMemo(() => [
        { id: 'edit', title: translate.Edit, onClick: onEditHandler },
        { id: 'delete', title: translate.Delete, onClick: onDeleteHandler },
    ], [onDeleteHandler, onEditHandler, translate.Delete, translate.Edit]);

    const onUpdateHandler = (val) => {
        onUpdate(val, () => {
            resetStates();
        });
    };

    return (
        <div className={classNames(styles.list, className)}>
            <ul ref={listRef}>
                {list.map((item, index) => (
                    <Item
                        label={item?.label}
                        onClick={(event) => onClickHandler(event, item, index)}
                        key={item?.id || index}
                        editMode={editMode}
                        currentItem={currentItem}
                        index={index}
                        onUpdate={onUpdateHandler}
                    />
                ))}
            </ul>
            <ActionList ref={actionsRef} actions={itemActions} position={actionsPosition} close={closeActions} />
        </div>
    );
};

List.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

List.defaultProps = {
    className: '',
    list: [],
    onUpdate: () => {},
    onDelete: () => {},
};

export default List;
