// Simple password check
const ADMIN_PASSWORD = "gameer_adminp4s3";

// Authenticate admin login
function authenticate() {
    const inputPassword = document.getElementById("adminPassword").value;
    if (inputPassword === ADMIN_PASSWORD) {
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("blogPostFormContainer").style.display = "block";
    } else {
        alert("Incorrect password. Access denied.");
    }
}

// Drag and drop for image
const dropZone = document.getElementById("dropZone");
const blogImageInput = document.getElementById("blogImage");

dropZone.addEventListener("click", () => blogImageInput.click());

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragover");

    if (event.dataTransfer.files.length > 0) {
        blogImageInput.files = event.dataTransfer.files;
        dropZone.innerText = `File selected: ${event.dataTransfer.files[0].name}`;
    }
});

// Save blog posts to localStorage
document.getElementById("blogPostForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("blogTitle").value;
    const content = parseMarkdown(document.getElementById("blogContent").value);
    const imageFile = blogImageInput.files[0];
    let imageUrl = "";

    // Read the image file as a base64 string
    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            imageUrl = reader.result;
            savePost(title, content, imageUrl);
        };
        reader.readAsDataURL(imageFile);
    } else {
        savePost(title, content, imageUrl);
    }

    function savePost(title, content, imageUrl) {
        let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
        blogPosts.push({ title, content, imageUrl });
        localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

        document.getElementById("blogPostForm").reset();
        dropZone.innerHTML = 'Drag & Drop or <span id="fileSelectText">Select File</span>';
        displayBlogPosts();
    }
});

// Display blog posts from localStorage
function displayBlogPosts() {
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const blogPostsContainer = document.getElementById("blogPosts");
    blogPostsContainer.innerHTML = "";

    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Blog image">` : ''}
        `;
        
        blogPostsContainer.appendChild(postElement);
    });
}

// Parse Markdown for links
function parseMarkdown(text) {
    const markdownLinkPattern = /<([^>]+)>\(([^)]+)\)/g;
    return text.replace(markdownLinkPattern, '<a href="$1" target="_blank">$2</a>');
}

// Initialize the display of blog posts on page load
window.onload = displayBlogPosts;
