import React from "react";
import { string, arrayOf, func, object } from "prop-types";
import { connect } from "react-redux";
// import {
//   setCurrPage,
//   saveUserState,
// } from "../../actions";
import pagesList from "../../pages-list/pagesList";
import NavigationTab from "./NavigationTab";

export const Navigation = ({
  workflowPages,
  currPage,
  errors,
  setCurrPage,
  saveUserState,
}) => {

  return (
    <ul className="usa-sidenav ctb-navigation">
      {
        workflowPages.map((pageName) => {
          const page = pagesList[pageName];

          return (
            <NavigationTab
              key={`navTab-${pageName}`}
              tabText={page.tabText}
              pageName={pageName}
              currPage={currPage}
              errors={errors}
              setCurrPage={setCurrPage}
              //saveUserState={saveUserState}
            />
          );
        })
      }
    </ul>
  );
};

Navigation.propTypes = {
  // Redux State
  workflowPages: arrayOf(string).isRequired,
  currPage: string.isRequired,
  errors: object.isRequired,
  // Dispatch Functions
  setCurrPage: func.isRequired,
  saveUserState: func.isRequired,
};

const mapStateToProps = (state) => ({
  workflowPages: state.workflowList.pages,
  currPage: state.currPage,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  // setCurrPage,
  // saveUserState,
})(Navigation);
