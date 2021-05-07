import React from "react";
import Page from "../ProjectPage/Page";
import {PageData} from "../../entities";
import {useEffect, useState} from "react";

const useFetchData = () => {
  return () => import('./page.json') as unknown as Promise<PageData>;
}



const Home = () => {
  let fetchData = useFetchData();
  const [data, setData] = useState<PageData>();
  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <Page title={data?.title} subtitle={data?.subtitle} image={data?.image}/>
  );
}

export default Home;