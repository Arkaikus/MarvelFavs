import React from 'react';
import './ExploreContainer.css';

export function ComicDetail(comicId:string){
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ComicDetail;
