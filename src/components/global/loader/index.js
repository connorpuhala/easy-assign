import { ReactComponent as LoaderSvg } from "images/Gear-0.5s-50px.svg";

export const LoaderWithinWrapper = ({ noSvg, className, text }) => (
  <div className={className ? className : "loader"}>
    {noSvg ? null : <LoaderSvg />}
    {text ? text : null}
  </div>
);

export const FullPageLoader = ({ noSvg, className }) => (
  <div className={className ? className : "loader"}>
    {noSvg ? null : <LoaderSvg />}
  </div>
);
