
const blogImage = document.getElementById("soleil-image");
const blogDescription = document.getElementById("blog-description");
const blogTitle = document.getElementById("blog-title");
const commentContainer = document.getElementById("comm-cont");
const logoutB = document.getElementById("auth2");
const loginB = document.getElementById("auth1");
const loginOverlay = document.getElementById("soleil-overlay");
const commentOverlay = document.getElementById("comment-overlay");
const relatedBlogs = document.getElementById("related-blogs")
const commentForm = document.getElementById("add-comment-form")
const comment = document.getElementById("comment-content")
const loader = document.getElementById("loader");
const main = document.getElementById("main");
const trackLikes = document.getElementById("track-like")
const likes = document.getElementById("likes");
const likeHolder = document.getElementById("like-holder")
const commentBtn = document.getElementById("comment-btn");
const loader2 = document.getElementById("loader2");
const span = document.getElementById("span");
const act = document.getElementById("acts");




let isLiked = false
trackLikes.style.cursor = "pointer"
trackLikes.style.display='none'



trackLikes.addEventListener("click", async () => {
  if (currentUser) {
    const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${blogIndex}/likes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    likes.innerHTML = data.data.likes.length;

    isLiked = !isLiked;
    trackLikesFn();

    console.log(data);
  } else {
    loginOverlay.style.display = "flex";
    act.textContent = "Like this blog";
  }
});

const trackLikesFn = () => {
  if (isLiked) {
    trackLikes.src = "./javascript/like.png"; 
  } else {
    trackLikes.src = "./javascript/unlike.png"; 
  }
};


let token = localStorage.getItem("token");
let currentUser;

const autoLoginUser = async ()=>{
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/users/auth/verify-token",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json();

    return data

  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    
  }
}


autoLoginUser().then(res=>{

  currentUser = res.data;

  if(currentUser){
    loginB.style.display = 'none';
    logoutB.style.display = 'flex';
  } else {
    loginB.style.display = 'block';
    logoutB.style.display = 'none';
  }

})

const logout =()=>{
  localStorage.removeItem("token");
  window.location.reload();
}


const loginUser = ()=>{
  window.location.href = "../login.html";
}

logoutB.addEventListener("click",logout);
loginB.addEventListener("click",loginUser);


const fetchBlogs = async () => {
  try {
      const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs", {
          headers: {
              'Access-Control-Allow-Origin': '*'
          }
      });

      const allBlogs = await response.json();
      return allBlogs;
  } catch (error) {
      console.error('Error fetching blogs:', error.message);
  }
};

const getCurrentBlog = async()=>{

  const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${blogIndex}`, {
      method:"GET",
      headers: {
          'Access-Control-Allow-Origin': '*'
      }
  });

  const foundBlog = await response.json()
  

  return foundBlog
}

// !currentBlog?likeHolder.style.display = 'none' : likeHolder.style.display="flex"


function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
const blogIndex = getQueryParam("blogId");

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];



let currentBlog;

let blogComments;



getCurrentBlog().then(response=>{
  const {data} = response

  console.log(response);


  currentBlog=data


  if(currentBlog){
    loader.style.display = "none"
  }

  trackLikes.style.display = "block"
  likes.innerHTML = currentBlog?.likes.length
  blogDescription.innerHTML = currentBlog?.content
  blogTitle.innerHTML = currentBlog?.title
  blogImage.style.display = "block"
  blogImage.src = currentBlog?.image
  blogComments = currentBlog?.comments

 isLiked = currentBlog?.likes.includes(currentUser?._id);
 trackLikesFn()


  currentBlog.comments.splice(-5).reverse().map(soleil=>{

    let html=` <div class="comment">
                  <img src="./images/ssss.jpg" alt="clasas" />
                  <div>
                    <div class="text-1">${soleil.author}</div>
                    <div class="text-2">${soleil.content}</div>
                  </div>
                </div>`

                commentContainer.insertAdjacentHTML("beforeend", html);

})


})







commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!comment.value) {
    commentOverlay.style.display = "flex"
    return;
  }

  if(!currentUser){
    loginOverlay.style.display ="flex"
    act.textContent="Comment on this blog"
    return;
  }

  loadComments()
  
})

const cancel = () => {
  loginOverlay.style.display = "none"
  loader2.style.display = "none"
  span.style.display="block"
}
const cancel1 = () => {
  commentOverlay.style.display = "none"
  loader2.style.display = "none"
  span.style.display="block"
}

const login = () => { 
  loginOverlay.style.display = "none"
  
  window.location.href='../login.html'
}



const loadComments = async() => {


  if(currentUser){
    
  }

 

  loader2.style.display="flex"
  span.style.display="none"
  if (comment.value) {
    if (currentUser) {
      const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${blogIndex}/comments`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content: comment.value })
  });


  if(response.status === 200) {
    loader2.style.display="none"
    span.style.display="block"

    getCurrentBlog().then(res=>{
      const {data} = res
      currentBlog=data
      trackLikes.style.display = "block"
      likes.innerHTML = currentBlog?.likes.length
      blogDescription.innerHTML = currentBlog?.content
      blogTitle.innerHTML = currentBlog?.title
      blogImage.style.display = "block"
      blogImage.src = currentBlog?.image
    
      commentContainer.innerHTML=""

      currentBlog.comments.splice(-5).reverse().map(soleil=>{

        let html=` <div class="comment">
                      <img src="./images/ssss.jpg" alt="clasas" />
                      <div>
                        <div class="text-1">${soleil.author}</div>
                        <div class="text-2">${soleil.content}</div>
                      </div>
                    </div>`
    
                    commentContainer.insertAdjacentHTML("beforeend", html);
    
    })
    

   
    })
  }

    const data = await response.json();

    console.log(data);



    commentForm.reset();
    } else {
      loginOverlay.style.display = "flex"
      initilaCommentLoading()
      return;
    }

    

  }

}



const initilaCommentLoading = () => {
    blogComments?.slice(0,6).reverse().map(content => {
  const html=` <div class="comment">
              <img src="./images/ssss.jpg" alt="clasas" />
              <div>
                <div class="text-1">${content.author}</div>
                <div class="text-2">${content.content}</div>
              </div>
            </div>`
  
    commentContainer.insertAdjacentHTML("beforeend", html);
  

})
}

initilaCommentLoading()






const displayRelatedBlogs = async()=>{

  const blogData = await fetchBlogs();
  try {
    blogData?.data?.forEach((blog) => {
      const truncatedDescription = blog?.content?.length > 30
       ? blog.content.substring(0, 25) + '... '
       : blog.content;
       const html =`<div class="related-blog" id="redirect">
             <img src=${blog.image} alt="" />
             <div>
               <h5>${blog.title}</h5>
               <p>${truncatedDescription}</p>
             </div>
           </div>`
       
       relatedBlogs.insertAdjacentHTML("beforeend", html);
       const currentBlog = relatedBlogs.lastElementChild;
       currentBlog.addEventListener("click", function (event) {
       window.location.href = `/blog.html?blogId=${blog._id}`;
     });
   })
  } catch (error) {
    console.log("error displaying blogs : ",error)
  }
}

displayRelatedBlogs()

