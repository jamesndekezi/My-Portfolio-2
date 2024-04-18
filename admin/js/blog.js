const addBlogButton = document.getElementById("add-blog-btn");
const blogOverlay = document.getElementById("blog-overlay");
const blogForm = document.getElementById("add-blog-form");
const blogTitle = document.getElementById("blog-title");
const blogDescription = document.getElementById("add-blog-description");
const blogImage = document.getElementById("blog-image");
const blogCount = document.getElementById("blog-count");
const blogContainer = document.getElementById("blog-cont");
const editOverlay = document.getElementById("edit-overlay");
const modal = document.getElementById("modal10");

const spinner3 = document.getElementById("spinner3");
const overlay3 = document.getElementById('overlay3');
const cancelEdit = document.getElementById('cancel-edit');
const confirmEdit = document.getElementById('confirm-edit');
const editBlogForm = document.getElementById("edit-blog-form");
const content = tinymce?.get('edit-blog-description')?.getContent();

const editBlogDescription = document.getElementById("edit-blog-description");
const newBlogImage = document.getElementById("new-blog-img");
const title = document.getElementById("edit-blog-title");


const editBlogImage = document.getElementById("edit-blog-image");
const loader5 = document.getElementById("loader5");
const conf = document.getElementById("conf");
let image;

let isDeleting = false;

const showModal = () => {
  if (isDeleting) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}


const hideModal = () => {
  modal.style.display = "none";
}



let blogs =[];

let token = localStorage.getItem("token");

const fetchBlogs = async () => {
  try {
    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}




export const renderBlogs = async () => {

  let blogData = await fetchBlogs();
blogs = blogData.data;
blogContainer.innerHTML = "";

blogs.forEach((blog) => {
  spinner3.style.display = "none";
  const idToDelete = `delete-${blog?._id}`;
  const idToEdit = `edit-${blog?._id}`;

  const html = `<div class="blog">
                <img src=${blog.image} />
                <div class="blog-description">
                  <p class="blog-category">
                    <span>${blog.likes.length} 
                    <img src="./js/like.png" style= "width:15px;height:15px" />
                  </p>
                  <p>${blog.title}</p>
                  <div class="blog-actions">
                    <button id="${idToDelete}">Delete</button>
                    <button class="edit-blog" id="${idToEdit}">Edit</button>
                  </div>
                </div>
              </div>`;

  blogContainer.insertAdjacentHTML("beforeend", html);

  
  const deleteButton = document.getElementById(idToDelete);
  const editButton = document.getElementById(idToEdit);

  deleteButton.addEventListener("click", async () => {
    const index = idToDelete.split("-")[1];
    blogContainer.innerHTML ="";
    await deleteBlog(index);
  });

  editButton.addEventListener("click", async() => {
    document.getElementById("modal-container").style.display = "block";
    console.log(editButton)
    const blogId = idToEdit.split("-")[1];
    const currentBlog = blogs.find(b => b._id === blogId);
    
    // await editBlog(currentBlog)

    title.value=currentBlog?.title;
    title.style.color = "black";
    editBlogImage.src= currentBlog?.image
    const editor = tinymce.get('edit-blog-description');
    editor.setContent(currentBlog?.content);

    editBlogForm.addEventListener("submit",async(e)=>{
      e.preventDefault()
      console.log("want to edit blog : ",blog.title)
  
      loader5.style.display = "flex";
      conf.style.display = "none";
  
      const formdata = new FormData()
  
      formdata.append("title",title.value)
      formdata.append("content",editor.getContent().replace(/<\/?p>/g, ""))
      if(image){
        formdata.append("image",image)
      }
  
      const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${currentBlog?._id}`, {
      method: 'PUT',
      body: formdata,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  
    if(response.status === 200){
  
      blogContainer.innerHTML = "";
      spinner3.style.display="flex"
      blogs=[]
      
      loader5.style.display = "none";
      conf.style.display = "block";
      conf.textContent="Success 🤡"
      conf.style.color="black"
      // confirmEdit.style.background="green"
      // await renderBlogs();
      document.getElementById("modal-container").style.display = "none";
      
  
      setTimeout(async() => {
        spinner3.style.display="none"
        conf.textContent="Confirm"
        confirmEdit.style.background="gray"
        overlay3.style.display="none"
        await renderBlogs();
  
      }, 3000);
     
  
    } else {
  
      loader5.style.display = "none";
      conf.style.display = "block";
      conf.textContent="Sth went Wrong 🤕"
      conf.style.color="red"
      confirmEdit.style.background="gray"
  
      await renderBlogs()
  
      setTimeout(() => {
        conf.textContent="Confirm"
        conf.style.color="black"
        overlay3.style.display="none"
        
      }, 3000);
  
    }
  
    })
  });
});
 
};

renderBlogs();

document.getElementById("modal-container").addEventListener("click",e=>{
  if(e.target.id === "modal-container"){
    document.getElementById("modal-container").style.display = "none";
  }
})


const deleteBlog = async (id) => {
  console.log("id to be deleted", id);

  isDeleting = true;
  showModal();
  try {
    const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);

    

    await renderBlogs()

    isDeleting = false;
    hideModal();
  } catch (error) {
    console.error('Error deleting blog:', error);
    isDeleting = false;
    hideModal();
  }
}

const handleEdit = () => {
  if (overlay3.style.display === "none" || overlay3.style.display === "") {
    overlay3.style.display = "block";
  }

  const isHidden = overlay3.style.display === "none"
  console.log(isHidden)
}


// editBlogForm.addEventListener("submit",e=>e.preventDefault());
  
const editBlog = async(blog)=>{

  handleEdit()

  title.value=blog?.title;
  title.style.color = "black";
  editBlogImage.src= blog?.image
  const editor = tinymce.get('edit-blog-description');
  editor.setContent(blog?.content);

  console.log("got called with : ", blog?._id)

  editBlogForm.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log("want to edit blog : ",blog.title)

    loader5.style.display = "flex";
    conf.style.display = "none";

    const formdata = new FormData()

    formdata.append("title",title.value)
    formdata.append("content",editor.getContent().replace(/<\/?p>/g, ""))
    if(image){
      formdata.append("image",image)
    }

    const response = await fetch(`https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs/${blog?._id}`, {
    method: 'PUT',
    body: formdata,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if(response.status === 200){

    blogContainer.innerHTML = "";
    spinner3.style.display="flex"
    blogs=[]
    
    loader5.style.display = "none";
    conf.style.display = "block";
    conf.textContent="Success 🤡"
    conf.style.color="black"
    confirmEdit.style.background="green"
    await renderBlogs();
    

    setTimeout(async() => {

      conf.textContent="Confirm"
      confirmEdit.style.background="gray"
      overlay3.style.display="none"

    }, 3000);
   

  } else {

    loader5.style.display = "none";
    conf.style.display = "block";
    conf.textContent="Sth went Wrong 🤕"
    conf.style.color="red"
    confirmEdit.style.background="gray"

    await renderBlogs()

    setTimeout(() => {
      conf.textContent="Confirm"
      conf.style.color="black"
      overlay3.style.display="none"
      
    }, 3000);

  }

  })

 
}


overlay3.addEventListener("click",e=>{
  if(e.target == overlay3){
    overlay3.style.display = "none";
    editBlogForm.reset()

  }
})

cancelEdit.addEventListener("click",()=>{
  overlay3.style.display = "none";
})





const onFileChange = (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    image = e.target.files[0];
    
    reader.onload = () => {
      editBlogImage.src = reader.result;
      // showImage.src = reader.result;
    };
  } else {
    console.log("No files selected");
  }
};


newBlogImage?.addEventListener("change", onFileChange);