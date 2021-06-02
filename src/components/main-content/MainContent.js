import React, { Fragment } from "react";
import { string } from "prop-types";
import { connect } from "react-redux";
//import pagesList from "../../pages-list/pagesList";

export const MainContent = ({ currPage }) => {
  //const PageComponent = currPage ? pagesList[currPage].component : Fragment;

  return (
    <div className="ctb-main-content grid-col">
      {/* <PageComponent /> */}
    </div>
  );
};

MainContent.propTypes = {
  // Redux state
  currPage: string.isRequired,
};

const mapStateToProps = (state) => ({
  currPage: state.currPage,
});

export default connect(mapStateToProps)(MainContent);
