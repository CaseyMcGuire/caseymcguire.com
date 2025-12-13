import {renderComponent} from "utils/ReactPageUtils";
import PageWrapper from "components/PageWrapper/PageWrapper";
import * as React from "react";

renderComponent(
  <PageWrapper fallbackComponent={<div>Loading</div>}>
    <div>hello world</div>
  </PageWrapper>
);