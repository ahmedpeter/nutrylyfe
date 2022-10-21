import React from "react";
import SidebarRow from './SidebarRow';
import SpeedIcon from '@material-ui/icons/Speed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BuildIcon from '@mui/icons-material/Build';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LuggageIcon from '@mui/icons-material/Luggage';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import './Builder.css'

function Sidebar() {

    return (
        <div className="sidebar no-print">
            <div className="logo__holder">
                <h3> Logo </h3>
            </div>
            
            <div className="s-divider"></div>
            {/* <h3 className="ml-20p"> Administrators </h3> */}
            <SidebarRow path="/app/dashboard"  Icon={SpeedIcon} title="Dashboard"/>
            <SidebarRow path="/app/manage-officers"  Icon={GroupsIcon} title="Manage Officers"/>
            <SidebarRow path="/app/manage-buses"  Icon={DirectionsCarIcon} title="Manage Buses"/>
            <SidebarRow path="/app/manage-drivers"  Icon={AccessibleIcon} title="Manage Drivers"/>
            <SidebarRow path="/app/manage-branches"  Icon={AltRouteIcon} title="Manage Branches"/>
            <SidebarRow path="/app/reports/payment" Icon={AssignmentIcon} title="Payment Report"/>

            <div className="s-divider"></div>
            {/* <SidebarRow path="/app/front-desk"  Icon={HomeWorkIcon} title="Front Desk"/> */}
            <SidebarRow path="/app/book-trip"  Icon={LuggageIcon} title="Book a Trip"/>
            <SidebarRow path="/app/ticket-validate"  Icon={BookOnlineIcon} title="Validate Ticket"/>
            <SidebarRow path="/app/modify-ticket"  Icon={PendingActionsIcon} title="Modify Ticket"/>
            
           
            <div className="w-100 abs f-bottom">
            <div className="s-divider"></div>
               <SidebarRow path="/app/config" Icon={BuildIcon} title="Configuration"/>
                <SidebarRow path="/app/notifications" Icon={NotificationsActiveIcon} title="Notification" /> 
                <div className="header__info">
                    <div className="user__avatar bg-warning">
                        <h3>MS</h3> 
                    </div>
                    <h4 className="title-case c-grey"> Marc Specter <br/>
                    <span className="summary__label font-9 role">Super Admin</span>
                    </h4> 
               </div>
            </div>
            
            
        </div>
    )
}

export default Sidebar
