import React, { useState } from 'react';
import './styles.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

function MovieRow( { title, items, type } ) {

  const [scrollX, setScrollX] = useState(-400);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0){
        x = 0;  
    }
    setScrollX(x);
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 200;
    if((window.innerWidth - listW) > x){
        x = (window.innerWidth - listW) - 80;  
    }
    setScrollX(x);
  }

  return (
    <div className="movieRow">
        <h2>{title}</h2>

        <div className="movieRow--left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{fontSize: 50}}/>
        </div>

        <div className="movieRow--right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{fontSize: 50}}/>
        </div>

        <div className="movieRow--listarea">
          <div 
            className="movieRow--list"
            style={{
              marginLeft: scrollX,
              width: items.results.length * 200
            }}
          >
            {
              items.results.length > 0 &&
              items.results.map((item, key) => (
                
                item.poster_path !== null &&
                    <div key={key} className="movieRow--item">
                      <Link to={`/details/${type}/${item.id}`}>
                        <img alt={item.original_title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                      </Link>
                    </div>
              ))
            }
          </div>
        </div>
    </div>
  );
}

export default MovieRow;
