import React, { useEffect, useState } from 'react';
import Tmdb from '../../Tmdb';
import { useParams } from 'react-router';
import TheatersIcon from '@material-ui/icons/Theaters';
import LanguageIcon from '@material-ui/icons/Language';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import iconAmazon from '../../assets/icon-amazon.png';
import iconNetflix from '../../assets/icon-netflix.png';
import './styles.css';
import { Link } from 'react-router-dom';

function Details(){
    const { id, type } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [trailerVideo, setTrailerVideo] = useState([]);
    const [urlVideo, setUrlVideo] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState(false);
    const [descriptionVideo, setDescriptionVideo] = useState();

    useEffect(() => {
        const loadAll = async () => {
            let movie = await Tmdb.getMovieInfo(id, type);
            let trailer = await Tmdb.getTrailerVideo(id, type)
            setMovieDetails(movie);
            setTrailerVideo(trailer);
            setDescriptionVideo(movie.overview.length > 120 ? movie.overview.substring(0, 120) + '...' : movie.overview);
            //console.log(movie)
        }
        loadAll();
    }, [id, type])
    
    function handleShowTrailer(){
        const trailer = trailerVideo.results;
        if(trailer !== undefined && trailer.length > 0){
            const url = `https://youtube.com/embed/${trailer[0].key}?autoplay=1&controls=0&showinfo=0&autohide=1`;
            setUrlVideo(url);
        }
    }

    function handleVideoFullScreen(){
        setVideoFullScreen(!videoFullScreen);
    }
    
    
    return (
        <main 
            className="details" 
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`
            }}
        >   
        <Link to="/" className="details--backbutton">Voltar</Link>
            <section> 
                <div>
                    <div className="details--info">
                        <h3 className={movieDetails.vote_average > 5 ? 'positive' : 'negative'}>{movieDetails.vote_average * 10 + '%'}</h3>
                    </div>

                    <h1>{movieDetails.original_title || movieDetails.original_name}</h1>

                    <h4>{descriptionVideo}</h4>

                    {
                        (trailerVideo.results !== undefined && trailerVideo.results.length !== 0)
                        &&
                        <a onClick={() => handleShowTrailer()} className="details--viewtrailer"><div><TheatersIcon />Assistir trailer</div></a>
                    }
                     {
                        (movieDetails.homepage !== undefined && movieDetails.homepage !== '') && 
                            <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer" className="details--officialsite">
                                <div>
                                    {
                                        movieDetails.homepage.includes('netflix') ?
                                        <img alt="Netflix" src={iconNetflix} width="23"/> :
                                        movieDetails.homepage.includes('amazon') ?
                                        <img alt="Amazon" src={iconAmazon} width="23"/> :
                                        <LanguageIcon />
                                    }
                                
                                </div>
                            </a>
                     }
                </div>
            </section>
            {
                urlVideo !== undefined
                &&
                <aside className={videoFullScreen ? 'video--fullscreen' : ''}>
                    <div>
                        <button onClick={() => handleVideoFullScreen()}><AspectRatioIcon /></button>
                    </div>
                    <iframe frameBorder="0" height="100%" width="100%" title="1"
                        src={urlVideo}>
                    </iframe>
                </aside>
            }
        </main>
    )
}

export default Details;