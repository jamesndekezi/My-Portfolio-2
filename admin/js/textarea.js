



const blogTitle = document.getElementById("new-title");
const blogImage = document.getElementById("new-image");
const newBlogForm = document.getElementById("new-blog-form");
const textArea = document.getElementById("mytextarea");
const blogCount = document.getElementById("blog-count");
const showImage = document.getElementById("show-image");
const label = document.getElementById("label");
const addBlogBtn=document.getElementById("soleil-test");
const span10 = document.getElementById("span10");
const loader10 = document.getElementById("loader10");
let image;

let token = localStorage.getItem("token")

loader10.style.display = "none";

const onFileChange = (e) => {
    if (e.target.files) {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        image = e.target.files[0]
        
        reader.onload = e => {
            blogImage.src = e.target.result;
            showImage.src = e.target.result
            showImage.style.display = "block"
            // label.style.display = "none"
        };
    }
};

blogImage.addEventListener("change", onFileChange);

newBlogForm.addEventListener("submit", async( e )=> {

    loader10.style.display = "flex";
    span10.style.display = "none";
    e.preventDefault();

    
    const content = tinymce.get('mytextarea').getContent();

    const description = content.replace(/<h1[^>]*>([^<]+)<\/h1>/i, "") 
                           .replace(/<img[^>]*src="([^"]+)"[^>]*>/i, "")
                           .replace(/<[^>]*>/g, "");

    const formdata = new FormData();
    formdata.append("title", blogTitle.value);
    formdata.append("image", image);
    formdata.append("content", description);

    if(description === ""){
        // alert("bad")
        loader10.style.display="none"
        span10.style.display ="block"
        span10.textContent="Blog content Missing"
        addBlogBtn.style.background="red"

        setTimeout(() => {
            span10.textContent="Add blog"
            addBlogBtn.style.background="gray"
        }, 2000);
        return
    }


    const response = await fetch("https://my-brand-backend-1-cqku.onrender.com/api/v1/blogs",{
        method: "POST",
        body: formdata,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    })

    if(response.status === 200){

        loader10.style.display ="none"
        span10.style.display ="block"
        span10.textContent="Success"
        addBlogBtn.style.background="green"

        localStorage.setItem("blogLoader",true)


        

        setTimeout(() => {

            span10.textContent="Add Blog"
            addBlogBtn.style.background="gray"
            newBlogForm.reset();
        showImage.style.display ="none"
            
        }, 2000);

    } 
    
    const data = await response.json();

    console.log(data)

    newBlogForm.reset();
    showImage.style.display ="none"
});


