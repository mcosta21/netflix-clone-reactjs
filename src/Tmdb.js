const API_KEY = 'COLOQUE SUA KEY AQUI';
const API_BASE = 'https://api.themoviedb.org/3';

/*
    - Originais da Netflix
    - Recomendados (Trending)
    - Em alta (Top rated)
    - Ação
    - Comédia
    - Terror
    - Romance
    - Documentários
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                type: 'tv',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                type: 'tv',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            }, 
            {
                slug: 'toprated',
                title: 'Em alta',
                type: 'movie',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                type: 'movie',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default: 
                    info = null;
                break;
            }
        }
        return info;
    },
    getTrailerVideo: async (movieId, type) => {
        let trailer = {};

        if(movieId){
            switch(type){
                case 'movie':
                    trailer = await basicFetch(`/movie/${movieId}/videos?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    trailer = await basicFetch(`/tv/${movieId}/videos?language=pt-BR&api_key=${API_KEY}`);
                break;
                default: 
                    trailer = null;
                break;
            }
        }
        return trailer;
    },
}