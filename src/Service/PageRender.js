import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../Pages/notfound';

const generatePage = (page,user) => {
 
  const element = () => require(`../Pages/${page}`).default
  try {

    return React.createElement(element(),{user})
    
  } catch (err) {
    console.warn(err);
    return <NotFound/>
  }
};

const PageRender = ({user}) => {
  
  const { page } = useParams();
  if(page==='edit-blog'||page==='blog'){
    return React.createElement(()=>404);
  }
  return <>{generatePage(page,user)}</>; 
};

export default PageRender;