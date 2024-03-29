import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Page from "../../../Page/Page";
import {db} from "../../../../services/firestore";

const Home = () => {
  const [page, setPage] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const fetchPages = async () => {
   return db.collection('pages')
      .doc((location.pathname).replace('/', ''))
      .get()
      .then((doc) =>  {
        setPage(doc.data());
      });
  }
  useEffect(() => {
    fetchPages()
        .then(()=> {setLoading(false)})
        .catch((err) =>  { console.log("ERROR: " + err)})
  }, []);
  return (
    <Page
      title={page?.title}
      subtitle={page?.subtitle}
      image={page?.image}
      tags={page?.tags}
      created_at={page.created_at}
      children={page?.children}
      loading={loading}
    />
  );
}

export default Home;