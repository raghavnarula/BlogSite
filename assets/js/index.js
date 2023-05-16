const axios = require('axios')

function colorChanger(bgColor){
    event.target.classList.toggle("upvoted")
    // this.style.display = "none"
    
    // Post Liked
    if (bgColor == "rgb(255, 59, 63)"){
        console.log("I have already liked the post")
        // sent Request on 
    }

    // Post Not Liked
    else{
        console.log("I now liked the post")
    }

}