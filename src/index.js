// Wait for the DOM to be fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  
    // Get the quote list element from the HTML
    const quoteList = document.querySelector("#quote-list");
    
    // Make a GET request to the API endpoint to get all quotes
    fetch("http://localhost:3000/quotes?_embed=likes")
      .then(response => response.json())
      .then(data => {
        // Loop through each quote in the data and add it to the quote list
        data.forEach(quote => {
          const li = document.createElement("li");
          li.classList.add("quote-card");
          
          const blockquote = document.createElement("blockquote");
          blockquote.classList.add("blockquote");
          
          const p = document.createElement("p");
          p.classList.add("mb-0");
          p.innerText = quote.quote;
          
          const footer = document.createElement("footer");
          footer.classList.add("blockquote-footer");
          footer.innerText = quote.author;
          
          const br = document.createElement("br");
          
          const likeBtn = document.createElement("button");
          likeBtn.classList.add("btn-success");
          likeBtn.innerText = `Likes: ${quote.likes.length}`;
          
          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("btn-danger");
          deleteBtn.innerText = "Delete";
          
          blockquote.appendChild(p);
          blockquote.appendChild(footer);
          blockquote.appendChild(br);
          blockquote.appendChild(likeBtn);
          blockquote.appendChild(deleteBtn);
          li.appendChild(blockquote);
          quoteList.appendChild(li);
        });
      })
      .catch(error => {
        console.error(error);
      });
    
    // Listen for form submit events
    const form = document.querySelector("#new-quote-form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      
      // Get the quote and author inputs from the form
      const quoteInput = document.querySelector("#new-quote");
      const authorInput = document.querySelector("#author");
      
      // Make a POST request to the API endpoint to create a new quote
      fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quote: quoteInput.value,
          author: authorInput.value
        })
      })
        .then(response => response.json())
        .then(data => {
          // Add the new quote to the quote list
          const li = document.createElement("li");
          li.classList.add("quote-card");
          
          const blockquote = document.createElement("blockquote");
          blockquote.classList.add("blockquote");
          
          const p = document.createElement("p");
          p.classList.add("mb-0");
          p.innerText = data.quote;
          
          const footer = document.createElement("footer");
          footer.classList.add("blockquote-footer");
          footer.innerText = data.author;
          
          const br = document.createElement("br");
          
          const likeBtn = document.createElement("button");
          likeBtn.classList.add("btn-success");
          likeBtn.innerText = `Likes: 0`;
          
          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("btn-danger");
          deleteBtn.innerText = "Delete";
          
          blockquote.appendChild(p);
          blockquote.appendChild(footer);
          blockquote.appendChild(br);
          blockquote.appendChild(likeBtn);
          blockquote.appendChild(deleteBtn);
          li.appendChild(blockquote);
          quoteList.appendChild(li);
          
          // Reset the form inputs
          quoteInput.value = "";
          authorInput.value = "";
        })
        .catch(error => {
          console.error(error);
        });
    });
    
    // Listen
  