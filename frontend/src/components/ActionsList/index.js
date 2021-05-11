import React, { useState, useLayoutEffect, useMemo, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useScreen } from 'hooks';

import styles from './styles.module.scss';

const MENU_ITEM_HEIGHT = 44;
const MODAL_WIDTH = 196;

const ActionsList = forwardRef(({ className, actions, position, close }, ref) => {
    const [open, setOpen] = useState(false);
    const { screen } = useScreen();

    useEffect(() => {
        if (close) {
            setOpen(false);
        }
    }, [close]);

    useLayoutEffect(() => {
        setOpen(!!position);
    }, [position]);

    const style = useMemo(() => {
        if (!position) {
            return null;
        }
        const blockHeight = MENU_ITEM_HEIGHT * actions?.length;

        const top = (position?.y + blockHeight > screen.height)
            ? (screen.height - blockHeight - 5)
            : position?.y;

        const left = (position?.x + MODAL_WIDTH > screen.width)
            ? (screen.width - MODAL_WIDTH - 5)
            : (position?.x - MODAL_WIDTH / 2);

        return { left, top };
    }, [position, screen.width, screen.height, actions?.length]);

    return (
        <div
            ref={ref}
            className={classNames(styles.listHolder, className, { [styles.open]: open })}
            style={style}
        >
            <ul className={styles.list}>
                {actions.map(({ id, title, onClick, testid }) => (
                    <li
                        testid={testid}
                        className={styles.item}
                        key={title}
                        onClick={(event) => onClick(event, id)}
                    >
                        {title}
                    </li>
                ))}
            </ul>
        </div>
    );
});

ActionsList.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    })),
    className: PropTypes.string,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    close: PropTypes.bool,
};

ActionsList.defaultProps = {
    className: '',
    actions: [],
    position: null,
    close: false,
};

export default ActionsList;
