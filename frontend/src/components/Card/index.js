import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

const CardComponent = ({ children, ...props }) => (
    <Card {...props}>
        {children}
    </Card>
);

CardComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CardComponent;
