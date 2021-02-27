import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabsComponent = (props) => {
    const { tabs, activeTab, className, ...otherProps } = props;
    const [activeTabVal, setActiveTabVal] = useState(activeTab);

    const handleChange = (event, newValue) => {
        setActiveTabVal(newValue);
    };

    return (
        <div className={className}>
            <Tabs
                value={activeTabVal}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                {tabs.map(({ label }) => <Tab key={label} label={label} />)}
            </Tabs>
            <div>
                {tabs.map(({ id, Component }, index) => (
                    activeTabVal === index && (
                        <Component key={id} {...otherProps} />
                    )
                ))}
            </div>
        </div>
    );
};

TabsComponent.propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
    })).isRequired,
    activeTab: PropTypes.number,
};

TabsComponent.defaultProps = {
    className: '',
    activeTab: 0,
};

export default TabsComponent;
