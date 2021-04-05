import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'clone-deep';
import classNames from 'classnames';

import THead from './THead';
import TBody from './TBody';

import styles from './styles.module.scss';

const TableComponent = (props) => {
    const { selectable, columns, data, onClickRow, filter } = props;
    const { initSelections, onSelectChange, link, className } = props;

    const [selectionsValue, setSelectionsValue] = useState(initSelections);

    useEffect(() => setSelectionsValue(initSelections), [initSelections]);

    const onSelect = (value, selection) => {
        const cloneSelects = cloneDeep(selectionsValue);

        if (value) {
            cloneSelects.push(selection);
        } else {
            const selectionIndex = selectionsValue.findIndex((sel) => sel.id === selection.id);
            cloneSelects.splice(selectionIndex, 1);
        }
        setSelectionsValue(cloneSelects);
        onSelectChange(cloneSelects);
    };

    const onSelectAll = (value, sel) => {
        const cloneSelects = cloneDeep(sel);

        if (!value) {
            cloneSelects.length = 0;
        }

        setSelectionsValue(cloneSelects);
        onSelectChange(cloneSelects);
    };

    return (
        <div className={classNames(styles.tableHolder, className)}>
            <table className={styles.table}>
                <THead
                    data={data}
                    columns={columns}
                    selectable={selectable}
                    selections={selectionsValue}
                    onSelectAll={(e, value) => onSelectAll(value, data)}
                    filter={filter}
                />
                <TBody
                    data={data}
                    link={link}
                    columns={columns}
                    onSelect={onSelect}
                    selectable={selectable}
                    selections={selectionsValue}
                    onClickRow={onClickRow}
                />
            </table>
        </div>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectable: PropTypes.bool,
    onClickRow: PropTypes.func,
    initSelections: PropTypes.arrayOf(PropTypes.object),
    onSelectChange: PropTypes.func,
    link: PropTypes.func,
    className: PropTypes.string,
    filter: PropTypes.func,
};

TableComponent.defaultProps = {
    className: '',
    selectable: true,
    onClickRow: undefined,
    initSelections: [],
    onSelectChange: () => {},
    link: () => {},
    filter: undefined,
};

export default TableComponent;
