import React from "react";
import Head from "next/head";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
//import Csrf from "../../../component/Csrf/Csrf";
//import classes from './Layout.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title: string;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const Layout = ({ children, title }: LayoutProps) => {
  //const classes = useStyles();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        {/* <Csrf /> */}
      </Head>
      <Header />
      <Container component={"main"} maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
