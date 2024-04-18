// const categories = document.querySelectorAll(".blog-category");
// const blogContainer = document.getElementById("mySwipper")
// const loader = document.getElementById("loader")

// const fetchBlogs = async () => {
//   try {
//       const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs", {
//           headers: {
//               'Access-Control-Allow-Origin': '*'
//           }
//       });

//       const allBlogs = await response.json();
//       return allBlogs;
//   } catch (error) {
//       console.error('Error fetching blogs:', error.message);
//   }
// };

// // categories.forEach(function (category) {
// //   category.addEventListener("click", function (event) {
// //     event.preventDefault();
// //     categories.forEach(function (otherCategory) {
// //       otherCategory.classList.remove("active");
// //     });

// //     this.classList.add("active");
// //   });
// // });







// const addBlogsToHome = async()=>{

//   const blogData = await fetchBlogs();
//   blogData?loader.style.display="none":loader.style.display="block";



//   blogData?.data?.forEach((blog, index) => {
//     const truncatedDescription = blog?.content?.length > 30
//        ? blog.content.substring(0, 10) + '... <span style="background-color:red;padding:5px 10px;border-radius:5px;white-space:nowrap;font-size:10px;color:white;height:20px;">Read More</span>'
//        : blog.content;
     
//      const comment= blog.comments.length
//      const likes= blog.likes.length
   
     
   
//      const html = ` <swiper-slide>
     
//      <div class="blog">
//        <img src=${blog.image} alt="blog image here" />
//        <div class="blog-description">
//          <div class="stats">
//            <div class="messs">
//              <img src="./images/social/message.png" alt="" />
//              <p>${comment}</p>
//            </div>
//            <div class="messs">
//              <img src="./images/social/likes (1).png" alt="" />
//              <p>${likes}</p>
//            </div>
//          </div>
//          <div class="title">${blog.title}</div>
//          <div class='below-title'>${truncatedDescription}</div>
//        </div>
//      </div>
     
//      </swiper-slide>`;
   
//      blogContainer.insertAdjacentHTML("beforeend", html);
//      const currentBlog = blogContainer.lastElementChild;
   
//      currentBlog.addEventListener("click", function (event) {
//        window.location.href = `/blog.html?blogId=${blog._id}`;
//      });
//    });
// }


// const initilaLoading = async()=>{

//   await fetchBlogs()
//   await addBlogsToHome()

// }


// initilaLoading()

// console.log(blogs)


const categories = document.querySelectorAll(".blog-category");
const blogContainer = document.getElementById("blogs-container")
const loader = document.getElementById("loader")

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

// categories.forEach(function (category) {
//   category.addEventListener("click", function (event) {
//     event.preventDefault();
//     categories.forEach(function (otherCategory) {
//       otherCategory.classList.remove("active");
//     });

//     this.classList.add("active");
//   });
// });







const addBlogsToHome = async()=>{

  const blogData = await fetchBlogs();
  // blogData?loader.style.display="none":loader.style.display="block";



  blogData?.data?.forEach((blog, index) => {
    const truncatedDescription = blog?.content?.length > 30
       ? blog.content.substring(0, 49) + '... <span style="background-color:red;padding:5px 10px;border-radius:5px;white-space:nowrap;font-size:10px;color:white;height:20px;">Read More</span>'
       : blog.content;

     const test=` <div class="blog">
     <img src="${blog?.image}" alt="">
     <div class="blog-text">
         <h4>
             ${blog?.title}
         </h4>
         <p>
            ${truncatedDescription}
         </p>
     </div>
     </div>`
   
     blogContainer.insertAdjacentHTML("beforeend", test);
     const currentBlog = blogContainer.lastElementChild;
   
     currentBlog.addEventListener("click", function (event) {
       window.location.href = `./blog.html?blogId=${blog._id}`;
     });
   });
}


const initilaLoading = async()=>{

  await fetchBlogs()
  await addBlogsToHome()

}


initilaLoading()

console.log(blogs)


