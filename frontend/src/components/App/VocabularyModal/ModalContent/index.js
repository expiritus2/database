import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CustomTabs } from 'components';
import { useTranslate } from 'hooks';
import {
    Skills, Position, Regions, WorkTypes, WorkPlace, WorkSchedule, EventTypes,
    Languages, LanguageLevels, LinkTypes, MessengersTypes, PhoneTypes,
} from './Tabs';

import styles from './styles.module.scss';

const ModalContent = (props) => {
    const { className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.modalContent, className)}>
            <CustomTabs
                direction={CustomTabs.DIRECTION_VERTICAL}
                tabsClassName={styles.tabs}
                tabClassName={styles.tab}
                wrapperClassName={styles.tabsWrapper}
                tabs={ModalContent.options(translate)}
                contentClassName={styles.tabsContentClassName}
                innerContentClassName={styles.innerContentClassName}
                listClassName={styles.listClassName}
                elementClassName={styles.elementClassName}
            />
        </div>
    );
};

ModalContent.options = (translate) => [
    { id: 'skills', label: translate.Skills, Component: Skills },
    { id: 'position', label: translate.Position, Component: Position },
    { id: 'regions', label: translate.Regions, Component: Regions },
    { id: 'workTypes', label: translate.WorkTypes, Component: WorkTypes },
    { id: 'place', label: translate.WorkPlaces, Component: WorkPlace },
    { id: 'workSchedule', label: translate.WorkSchedule, Component: WorkSchedule },
    { id: 'eventTypes', label: translate.EventTypes, Component: EventTypes },
    { id: 'languages', label: translate.Languages, Component: Languages },
    { id: 'languageLevels', label: translate.LanguageLevels, Component: LanguageLevels },
    { id: 'linkTypes', label: translate.LinkTypes, Component: LinkTypes },
    { id: 'messengersTypes', label: translate.MessengersTypes, Component: MessengersTypes },
    { id: 'phoneTypes', label: translate.PhoneTypes, Component: PhoneTypes },
];

ModalContent.propTypes = {
    className: PropTypes.string,
};

ModalContent.defaultProps = {
    className: '',
};

export default ModalContent;
