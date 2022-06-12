import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  SidebarHeader,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { FaGem, FaEdit } from "react-icons/fa";

import "react-pro-sidebar/dist/css/styles.css";
import styles from "./styles.module.scss";

const SideNav = () => {
  return (
    <ProSidebar rtl={true}>
      <SidebarHeader>
        <div className={styles.header}>ניהול נתונים</div>
      </SidebarHeader>
      <Menu iconShape="circle">
        <MenuItem icon={<FaGem />}>
          <Link to="/update">לוח בקרה</Link>
        </MenuItem>
        <SubMenu title="עריכת נתונים" icon={<FaEdit />} defaultOpen>
          <MenuItem>
            <Link to="/update/links">לינקים</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/update/departments">מחלקות</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/update/departmentLinks">לינקים לפי מחלקות</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/update/shobDevelopments">פיתוחי מעבדה</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default React.memo(SideNav);
