function colorChanger(bgColor,blogid,userid){
    event.target.classList.toggle("upvoted")

    // Disliking the Post
    if (bgColor == "rgb(255, 59, 63)"){
        console.log("I have already liked the post")

        const data = {
            upvote:0,downvote:-1
        }

        axios.post(`http://localhost:9001/api/blog/${blogid}/voting`,data)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

		axios.patch(`http://localhost:9001/api/blog/${blogid}/unsave`)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // Post Not Liked
    else{
        console.log("I now liked the post")      
        const data = {
            upvote:1,downvote:0
        }

        axios.post(`http://localhost:9001/api/blog/${blogid}/voting`,data)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

		// also send the blogid to the users saved_post
		axios.patch(`http://localhost:9001/api/blog/${blogid}/save`)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

}