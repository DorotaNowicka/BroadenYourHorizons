import React, { useState } from "react";
import SelectionPage from "../components/SelectionPage";
import DiscoverPage from "../components/DiscoverPage";

function ContentRouter(props) {
  const [state, setState] = useState();
  return (
    <h1>Skąd tu?</h1>
    // <Switch>
    //   <Route path="/discover" component={<DiscoverPage />} />
    //   <Route path="/" component={<SelectionPage />} />
    // </Switch>
  );
}

export default ContentRouter;
