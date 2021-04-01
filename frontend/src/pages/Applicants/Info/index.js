/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper, SalaryValue } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { educationMap } from 'settings/constants/education';
import { Item } from 'pages/Applicants/Info/components';
import { useTranslate } from 'hooks';
import { capitalize } from 'lodash-es';
import Name from './Name';
import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';
import Phones from './Phones';
import Emails from './Emails';
import Positions from './Positions';
import Skills from './Skills';
import Regions from './Regions';
import Information from './Information';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const applicant = useSelector(getCurrentApplicantSelector);

    const getLanguageValue = () => {
        const applicantLanguages = applicant?.languages;
        if (!applicant || !applicantLanguages) return [];
        return applicant.languages.map((language, index) => {
            if (!language?.name) return null;
            const name = capitalize(language?.name);
            return (
                <div key={index}>
                    {`${translate[name]}${language?.level ? ` - ${language?.level}` : ''}`}
                </div>
            );
        }).filter((language) => language);
    };

    return (
        <>
            <Header />
            {applicant ? (
                <>
                    <Actions />
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <Name {...applicant} />
                        <div className={styles.details}>
                            <Phones phones={applicant?.phones} />
                            <Emails emails={applicant?.emails} />
                            <Item label={translate.Skype} value={applicant?.skype} />
                            <Item
                                label={translate.Salary}
                                value={(
                                    <SalaryValue
                                        currency={applicant?.salary?.currency}
                                        value={applicant?.salary?.amount}
                                    />
                                )}
                            />
                            <Item
                                label={translate.Experience}
                                value={
                                    applicant?.experienceYears
                                        ? `${applicant?.experienceYears} ${translate.Years}`
                                        : ''
                                }
                            />
                            <Positions positions={applicant?.positions} />
                            <Skills skills={applicant?.skills} />
                            <Item
                                label={translate.Place}
                                value={applicant?.place?.map((place) => translate[capitalize(place)]).join(', ')}
                            />
                            <Regions regions={applicant?.regions} />
                            <Item
                                label={translate.Education}
                                value={translate[educationMap[applicant?.education?.trim()]]}
                            />
                            <Item
                                label={translate.Languages}
                                value={getLanguageValue()}
                            />
                            <Information value={applicant?.info} />
                        </div>
                    </ScrollWrapper>
                </>
            ) : <Empty />}
        </>
    );
};

Info.propTypes = {
    className: PropTypes.string,
};

Info.defaultProps = {
    className: '',
};

export default Info;
