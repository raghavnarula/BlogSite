function colorChanger(bgColor,blogid,userid){

    if (bgColor == "rgb(255, 59, 63)"){
        event.target.classList.toggle("downvoted")

    // Disliking the Post
        console.log("I have already liked the post")

        const data = {
            upvote:0,downvote:-1
        }

        axios.post(`http://localhost:9001/api/blog/${blogid}/voting`,data)
        .then((data)=>{
            // console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

		axios.patch(`http://localhost:9001/api/blog/${blogid}/unsave`)
        .then((data)=>{
            // console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

        // change the button
        event.target.classList.add('upVote')
        event.target.classList.add('likeButton')
        
        event.target.classList.remove('downvoted')
        event.target.classList.remove('downvote')
        event.target.classList.remove('alreadyLikedButton')

        event.target.textContent="UpVote"
    }
    else{
        event.target.classList.toggle("upvoted")
        
        console.log("I now liked the post")      
        const data = {
            upvote:1,downvote:0
        }

        axios.post(`http://localhost:9001/api/blog/${blogid}/voting`,data)
        .then((data)=>{
            // console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

        // also send the blogid to the users saved_post
        axios.patch(`http://localhost:9001/api/blog/${blogid}/save`)
        .then((data)=>{
            // console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        
            // change the button
            event.target.classList.add('downvote')
            event.target.classList.add('alreadyLikedButton')
            
            event.target.classList.remove('upVote')
            event.target.classList.remove('upvoted')
            event.target.classList.remove('likeButton')

            event.target.textContent="DownVote"
        }
}