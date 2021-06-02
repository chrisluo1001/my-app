import React from "react";
import {
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  CTB_HELP_URL,
  SSO_LOGOUT_URL,
} from "../../constants";

import WhatsNewButton from "../whats-new/WhatsNewButton";

const versionNumber = window.versionNumber || "2.0.0";

const Header = () => (
  <div className="ctb-header">
    <div className="ctb-header-left">
      <span className="ctb-va-logo">
        <span className="ctb-va-logo-txt">VA logo</span>
      </span>
      <span>
        <h1>Consult Toolbox</h1>
        <span className="ctb-version">v{versionNumber}</span>
      </span>
    </div>
    <div className="ctb-header-right">
      <WhatsNewButton />
      <a
        href={CTB_HELP_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="ctb-help-btn"
        aria-label="Click for Help with using CTB"
        className="ctb-help-link"
        title="Click for Help with using CTB"
      >
      <FaQuestionCircle className="ctb-help-qmark" />Help
      </a>
      <a
        href={SSO_LOGOUT_URL}
        id="ctb-logout-btn"
        aria-label="Click to sign out of your Single Sign On session."
        className="ctb-logout-link"
        title="SSO Logout"
      >
      <FaSignOutAlt className="ctb-logout-icon" />Logout
      </a>
    </div>
  </div>
);

export default Header;
