import { Dimmer, Loader } from "semantic-ui-react";

export const LoaderWithinWrapper = ({ text }) => (
  <Dimmer active inverted>
    <Loader size="medium">{text ? text : "Loading"}</Loader>
  </Dimmer>
);
