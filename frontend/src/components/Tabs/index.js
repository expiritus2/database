import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { LocationService } from 'services';

import Tab from './Tab';
import Content from './Content';

import styles from './styles.module.scss';

const locationSrv = new LocationService();

const Tabs = (props) => {
    const { tabs, animation, enableQueryParams, activeTabIndex, wrapperClassName, direction, ...rest } = props;
    const {
        queryParamName, tabsClassName, tabClassName, contentClassName, activeTabClassName, getActiveTab, ...passedProps
    } = rest;
    const { location, history } = passedProps;

    locationSrv.setLocation(location);

    const [activeTab, setActiveTab] = useState(
        enableQueryParams ? locationSrv.getQuery()[queryParamName] || activeTabIndex : activeTabIndex,
    );

    useEffect(() => getActiveTab(activeTab), [activeTab, getActiveTab]);

    const onClick = useCallback((index) => (enableQueryParams
        ? history.replace(locationSrv.setQuery({ [queryParamName]: index + 1 }))
        : setActiveTab(index)), [enableQueryParams, history, queryParamName]);

    const getIsActiveTab = (index) => {
        if (enableQueryParams) {
            const queryActiveTab = locationSrv.getQuery(location)[queryParamName];
            return (queryActiveTab ? queryActiveTab - 1 : activeTabIndex) === index;
        }

        return activeTab === index;
    };

    const renderTabs = () => tabs.map(({ label, Icon }, index) => (
        <Tab
            key={label}
            label={label}
            onClick={() => onClick(index)}
            isActive={getIsActiveTab(index)}
            direction={direction}
            activeTabClassName={activeTabClassName}
            className={tabClassName}
            icon={Icon}
        />
    ));

    const renderContent = () => tabs.map(({ label, Component }, index) => (
        <Content
            className={contentClassName}
            key={label}
            animation={animation}
            isActive={getIsActiveTab(index)}
            direction={direction}
        >
            <Component tabLabel={label} {...passedProps} />
        </Content>
    ));

    return (
        <div className={classNames(styles.wrapper, styles[direction], wrapperClassName)}>
            <div className={classNames(styles.tabs, tabsClassName)}>{renderTabs()}</div>
            <div className={styles.contentWrapper}>{renderContent()}</div>
        </div>
    );
};

Tabs.DEFAULT = 'default';
Tabs.FADE_IN = 'fadeIn';
Tabs.SLIDE_IN_BOTTOM = 'slideInBottom';
Tabs.SLIDE_IN_LEFT = 'slideInLeft';
Tabs.SLIDE_IN_RIGHT = 'slideInRight';

Tabs.DIRECTION_HORIZONTAL = 'horizontal';
Tabs.DIRECTION_VERTICAL = 'vertical';

Tabs.propTypes = {
    wrapperClassName: PropTypes.string,
    tabsClassName: PropTypes.string,
    tabClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    activeTabClassName: PropTypes.string,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
    ).isRequired,
    animation: PropTypes.string,
    enableQueryParams: PropTypes.bool,
    activeTabIndex: PropTypes.number,
    direction: PropTypes.string,
    queryParamName: PropTypes.string,
    getActiveTab: PropTypes.func,
};

Tabs.defaultProps = {
    wrapperClassName: '',
    tabsClassName: '',
    tabClassName: '',
    contentClassName: '',
    activeTabClassName: '',
    animation: Tabs.FADE_IN,
    enableQueryParams: false,
    activeTabIndex: 0,
    direction: Tabs.DIRECTION_HORIZONTAL,
    queryParamName: 'activeTab',
    getActiveTab: () => {},
};

export default withRouter(Tabs);
