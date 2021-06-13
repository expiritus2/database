import React from 'react';
import PropTypes from 'prop-types';

import TR from './TR';
import TH from './TH';

const THead = ({ columns, filter, ...props }) => (
    <thead>
        <TR {...props}>
            {columns.map((column) => (
                <TH key={column.key} column={column} filter={filter} className={column?.className} />
            ))}
        </TR>
    </thead>
);

THead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
    })).isRequired,
    filter: PropTypes.func,
};

THead.defaultProps = {
    filter: undefined,
};

export default THead;
