import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CardActionArea from '@mui/material/CardActionArea';




const baseurl = "https://www.omdbapi.com/?apikey=b9a5e69d&t="

export const DetailsComp = (Details) => {
          const [IMDBDetails, setIMDBDetails] = useState()
    useEffect(()=>{
      
      // below code is for IMDB ratings but that url itself is giving IMDB ratings 
      // as NA , url is correct and even i am able to make correct call
        var obj = {
            1 : "Episode I",
            2 : "Episode II",
            3 : "Episode III",
            4 : "Episode IV",
            5 : "Episode V",
            6 : "Episode VI"
        } 
        var _str;
        for (let i in obj){
            if(Details.episode_id==i){
                _str =[obj[i]]
            }
        }
        var _url = baseurl + `Star Wars ${_str} ${Details.title}`
         var test = _url.replace(/ /g, '%20')
        fetch(test).then((res)=>res.json()).then(data=>{
            setIMDBDetails(data)})
                   
    },[Details.title])

    
    debugger;
  return (

    <div>
        
  
      {
        (Object.values(Details).length>0) ?  <>
        <div>
       <Card sx={{ maxWidth: 750 }}>
       
       <CardActionArea>
         
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
           {Details.title}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {Details.opening_crawl}
           </Typography>
           <Typography gutterBottom variant="h6" component="div">
            <br/>
             Directed By  {Details.director}
           </Typography>
           <Typography> <br/> <span>Give Rating </span>
           <Rating
               name="simple-uncontrolled"
               onChange={(event, newValue) => {
                 console.log(newValue);
               }}
               defaultValue={7}
               max={10}
             />
       
           </Typography>
         </CardContent>
       </CardActionArea>
       </Card>
       
           <b><u></u></b><br/><br/></div><div></div>
           
           </>  :           " Please select a movie" 
      }
 



     
    </div>
  )
}
