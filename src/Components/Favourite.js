import React, { Component } from 'react'
import {movies} from './getMovies';
export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genre:[],
            currGen:"All Genres",
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let Data = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp=[];
        Data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genre:[...temp],
            movies:[...Data]
        })
    }

    handleGenreChange=(genre)=>{
        this.setState({
            currGen : genre
        })
    }

    handlePopularityDesc=()=>{
        let temp = this.state.movies
        temp.sort(function(objA, objB){
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePopularityasc=()=>{
        let temp = this.state.movies
        temp.sort(function(objA, objB){
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }

    handleRatingDesc=()=>{
        let temp = this.state.movies
        temp.sort(function(objA, objB){
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatingasc=()=>{
        let temp = this.state.movies
        temp.sort(function(objA, objB){
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })

    }
    handleDelete =(id)=>{
        let newarr=[];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id != id);
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr));
    }
  render() { // setState can be applied inside the render
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    
    let filterMovies=[];
    if(this.state.currText === ''){
        filterMovies = this.state.movies
    }else{
        filterMovies = this.state.movies.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase());
        })
    }
        if(this.state.currGen !==    "All Genres"){
        filterMovies = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]=== this.state.currGen)
    }
    let pages = Math.ceil(filterMovies.length/this.state.limit);
    let pagesarr=[];
    for(let i=1;i<=pages; i++){
        pagesarr.push(i);
    }
    let si = (this.state.currPage -1) * this.state.limit;
    let ei = si + this.state.limit;
    filterMovies = filterMovies.slice(si, ei);
    return (
      <div>
        <>
            <div className="Main">
                <div className="row">
                    <div className="col-3">
                        <ul className="list-group favourite-genres">

                            {
                                this.state.genre.map((genre)=>(
                                    this.state.currGen === genre ?
                                    <li class="list-group-item" style={{backgroundColor:"#4834d4", color:"white", fontWeight:"bold"}}>{genre}</li>:
                                    <li class="list-group-item" style={{backgroundColor:"white", color:"#4834d4"}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-9">
                       <div className="row favourite-table">
                            <input type="text" className="input-group-text col" placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                            <input type="number" className="input-group-text col" placeholder='Rows Count' value ={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                       </div>
                       <div className="row">
                       <table class="table">
                       <thead>
                         <tr>
                           <th scope="col">Title</th>
                           <th scope="col">Genre</th>
                           <th scope="col"><i class="fa-solid fa-up-long" onClick={this.handlePopularityDesc}></i>Popularity <i class="fa-solid fa-down-long" onClick={this.handlePopularityasc}></i></th>
                           <th scope="col"><i class="fa-solid fa-up-long" onClick={this.handleRatingDesc}></i>Rating<i class="fa-solid fa-down-long" onClick={this.handleRatingasc}></i></th>
                           <th scope="col"></th>
                         </tr>
                       </thead>
                       <tbody>
                        {
                            filterMovies.map((movieObj)=>(
                                <tr>
                                    <td> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:"5rem"}}/> {movieObj.original_title}</td>
                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                       </tbody>
                     </table>
                       </div>

                       <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            {
                                pagesarr.map((page)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                ))
                            }
                        </ul>
                     </nav>
                    </div>
                </div>
            </div>
        </>
      </div>
    )
  }
}
