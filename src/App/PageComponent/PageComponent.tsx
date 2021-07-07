import React, {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import TextComponent from "./Components/TextComponent";
import ImageComponent from "./Components/ImageComponent";
import MathComponent from "./Components/MathComponent";

/*
{"type": "CODE_GIST", "src": "https://gist.github.com/MarcoNapoleone/f37643706d59249f154cfef940716ae8.js"}
 */
const parseComponent = (data: string) => {
  return (JSON.parse(data));
}

type PageComponentProps = {
  content: string,
}
const PageComponent: React.FC<PageComponentProps> = ({content}) => {
  const component = parseComponent(content);
  switch (component.type) {
    case "TEXT":
      return (<TextComponent title={component.title} content={component.content}/>);
    case "IMAGE":
      return (<ImageComponent url={component.url} credit={component.credit}/>);
    case "MATH_EQUATION":
      return (<MathComponent content={component.content}/>);
    default:
      return (<a>error</a>);
  }
}

export default PageComponent;