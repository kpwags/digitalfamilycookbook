import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { Page } from '../Page/Page';
import { Overlay } from '../Overlay/Overlay';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { AppContext } from '../AppContext/AppContext';

const MainApp = props => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [searchBarVisible, setSearchBarVisible] = useState(false);

    const { data, loading } = useQuery(CURRENT_USER_QUERY);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const toggleSearchBar = () => {
        setSearchBarVisible(!searchBarVisible);
    };

    if (loading) {
        return <LoadingBox />;
    }

    return (
        <AppContext.Provider
            value={{
                overlayVisible,
                toggleOverlay,
                searchBarVisible,
                toggleSearchBar,
                loggedInUser: data.me,
            }}
        >
            <Overlay id="page-overlay" open={overlayVisible} />
            <Page>{props.children}</Page>
        </AppContext.Provider>
    );
};

MainApp.propTypes = {
    children: PropTypes.node,
};

export { MainApp };
