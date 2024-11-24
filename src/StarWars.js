import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';


import { alpha } from '@mui/material/styles';
import { DetailsComp } from './DetailsComp';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  height:50,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize:"1.2vw",
  fontFamily:"verdana",
  verticalAlign:"middle",
  padding:10,
  margin:0,
  border:"1px solid black",
  
  borderRadius:0,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export const StarWars = () => {

    const [Movies, MoviesDetails] = useState([])

    const [MoviesCopy, MoviesCopyDetails] = useState([])
    
    const [SelectedMovieDetails,SetSelectedMovieDetails] = useState([])

   const handleSearch = (e) =>{

    //Search Works if any of the typed character is present in title irrespective of postion
    // if you want to search from that word only use below regex
    // var _searchRegex =  `^${_searchTerm}`
    //var _FilteredData = Movies.filter((e)=>e.title.toLowerCase().match(_searchRegex))
    var _searchTerm = e.target.value
    if(!_searchTerm){
        MoviesDetails(MoviesCopy)

    } else {
        var _FilteredData  =  Movies.filter((e)=>e.title.toLowerCase().includes(_searchTerm.toLowerCase()))
        MoviesDetails(_FilteredData)
    }

   }
  
    const handleMovieClick = (e) =>{

        console.log(e)
        
           debugger;
        var _SelectedMovieDetails = Movies.find((ele)=>ele.episode_id==e.target.title)
        SetSelectedMovieDetails(_SelectedMovieDetails)
        

    }

  useEffect(()=>{

    fetch('https://swapi.dev/api/films/?format=json')
    .then((res)=>res.json())
    .then((data)=>{
        MoviesDetails(data.results)
        MoviesCopyDetails(data.results)

    })

  },[])

  var handlePromiseChange = function (_filterTerm){
    return new Promise((resolve,reject)=>{

    })
  }

   
  const handleddlChange = (e)=>{
    debugger;
    var _filterTerm = e.target.options[e.target.selectedIndex].value
    var _filteredArray=[];
    if(_filterTerm=="Title"){
        _filteredArray=  Movies.sort((a,b)=>{
            debugger;
            return a.title.localeCompare(b.title)
        }).map(e=>e)
        MoviesDetails(_filteredArray)
    } 
    if(_filterTerm=="Episode"){
                _filteredArray = Movies.sort((a,b)=>b.episode_id - a.episode_id).map(e=>e) 
                MoviesDetails(_filteredArray)
     }
     if(_filterTerm=="Year"){
      //get release date

      _filteredArray = Movies.sort((a,b)=>new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear()).map(e=>e) 
      MoviesDetails(_filteredArray)
}
   
   
  }

  return (
    <div>
            
            <Container maxWidth="1000px">
            
            <Grid container spacing={0}>
            <Grid size={2}>
    <Item>
               Sort By <select  id="ddlSelect" onChange={handleddlChange}>
                <option> Select</option>
                <option>Episode</option>
                <option>Title</option>
                <option>Year</option>
                </select>

    </Item>
  </Grid>
  <Grid size={10}>
    <Item>
        <SearchIcon/>
        <input type='text' className='txtInput' placeholder='Search' onChange={handleSearch}/>
    </Item>
  </Grid> 
           
    
  
  <Grid size={5}>
  {
                    Movies.map((e)=> <span id="MovieListHeader"><Item title={e.episode_id} onClick={handleMovieClick}><span className="divEpisodeID">Episode {e.episode_id}</span>{e.title}<span className='divReleaseDate'>{e.release_date}</span></Item></span>)
  }
  </Grid>
  <Grid size={7}>
           <Item style={{height:410,borderLeft:"0px",borderCollapse:"collapse"}} >
                    <DetailsComp {...SelectedMovieDetails}/>
           </Item>
  </Grid>
  </Grid>
  
            </Container>

    </div>
  )
}
