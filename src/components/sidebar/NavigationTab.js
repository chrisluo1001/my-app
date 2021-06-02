import React from "react";
import { string, func, object } from "prop-types";
import { AlertIcon } from "../controls";

const NavigationTab = ({
  tabText,
  pageName,
  currPage,
  errors,
  setCurrPage,
  saveUserState,
}) => {
  const pageErrors = errors[pageName];

  const updatePage = () => {
    saveUserState();
    setCurrPage(pageName);
  };

  return (
    <li className="usa-sidenav__item">
      <button
        id={pageName}
        className={`${pageName === currPage ? "usa-current" : ""} ${pageErrors ? "ctb-page-error" : ""}`}
        onClick={updatePage}
        aria-label={pageErrors && `${tabText} This page has errors`}
      >
        {tabText}
        {pageErrors && <AlertIcon />}
      </button>
    </li>
  );
};

NavigationTab.propTypes = {
  tabText: string.isRequired,
  pageName: string.isRequired,
  currPage: string.isRequired,
  errors: object.isRequired,
  setCurrPage: func.isRequired,
  saveUserState: func.isRequired,
};

export default NavigationTab;
