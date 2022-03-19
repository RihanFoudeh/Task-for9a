import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getProviders, signIn, useSession } from "next-auth/react";
import Card from "../components/Card";
import Header from "../components/Header";
export default function Home({ providers }) {
  const [image, setImage] = useState([]);
  const [searched, setsearched] = useState([]);
  const { data, status } = useSession();
  const refc = useRef(null);
  const [vis, setvis] = useState(false);
  const [num, setnum] = useState(1);
  async function getData(n) {
    await axios
      .get(
        `https://api.unsplash.com/photos/random/?count=30&page=${n}&client_id=5xVjU208TevnwYCdPdmXIKnGTA6QZiDd4cPbtLdovFM`
      )
      .then(({ data }) => {
        setImage([...image, ...data]);
      });
    setnum(n);
  }

  useEffect(() => {
    getData(num);
  }, []);

  
  useEffect(() => {
    const obs = new IntersectionObserver((e) => {
      const entrie = e[0];
      setvis(entrie.isIntersecting);
    });

    obs.observe(refc.current);
    console.log("myref", refc.current);
  }, []);
  useEffect(() => {
    if (vis === true) {
      getData(num + 1);
      getData(num);
    }
  }, [num, vis]);
  
/*   {/* <button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/" })
        }
      >
        click
      </button> */ 

  async function getSearchData(q) {
    const url2 = `https://api.unsplash.com/search/collections?page=1&query=${q}&client_id=5xVjU208TevnwYCdPdmXIKnGTA6QZiDd4cPbtLdovFM`;
    await axios.get(url2).then(({ data: { results } }) => {
      const formatedSerarch = results.map((item) => {
        // item.urls.small
        // item.user.first_name
        // item.user.profile_image.small
        return {
          urls: {
            small: item.cover_photo.urls.small,
          },
          user: {
            first_name: item.cover_photo.user.first_name,
            profile_image: {
              small: item.cover_photo.user.profile_image.small,
            },
          },
        };
      });

      // console.log(formatedSerarch);
      setsearched(formatedSerarch);
      // setImage(formatedSerarch);
    });
  }

  return (
    <div className="main">

      <Header getdata={getSearchData} />

      <div className="grid">
       {searched.length > 0 ? 
       <>
     {searched?.map((item, index) => {
          return (
            <div key={index} className="hello">
              <Card
                main={item.urls.small}
                artestName={item.user.first_name}
                avatar={item.user.profile_image.small}
              />
            </div>
          );
        } )}  </> : null}

      </div>
{searched.length > 0&&<hr/>}
      <div className="grid">
     { image.map((item, index) => {
          return (
            <div key={index} className="hello">
              <Card
                main={item.urls.small}
                artestName={item.user.first_name}
                avatar={item.user.profile_image.small}
              />
            </div>
          );
        })}
        
      </div>
        <p ref={refc}> last item</p>;
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const providers = await getProviders();

  return { props: { providers } };
};
