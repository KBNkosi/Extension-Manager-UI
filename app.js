 const jsonFilePath="./data.json"

 async function fetchData(){
  try {
     const response = await fetch(jsonFilePath);

     if (!response.ok){
      throw new Error("Network response was not ok: " + response.statusText);
     }

     const extensions = await response.json();


     extensions.forEach(extension => {
      const extensionCard=document.createElement("div");
      extensionCard.classList.add("extension-card");
      
      const extensionCardBody=document.createElement("div");
      extensionCardBody.classList.add("extension-card-body");

      const extensionCardContent=document.createElement("div");
      extensionCardContent.classList.add("extension-card-content");

      const extensionCardButtons=document.createElement("div");
      extensionCardButtons.classList.add("extension-card-btns")

      const sliderButton=document.createElement("button");
      sliderButton.textContent="slide"
      sliderButton.classList.add("slider-btn");

      const removeButton=document.createElement("button");
      removeButton.textContent="remove"
      removeButton.classList.add("remove-btn");

      const imgElement=document.createElement("img");
      imgElement.src=extension.logo
      imgElement.alt=extension.name
      imgElement.classList.add("extension-logo")

      const headingElement=document.createElement("h2");
      headingElement.textContent=extension.name


      const paraElement=document.createElement("p");
      paraElement.textContent=extension.description

      extensionCardContent.appendChild(imgElement);
      extensionCardContent.appendChild(headingElement);
      extensionCardContent.appendChild(paraElement);

      extensionCardButtons.appendChild(removeButton);
      extensionCardButtons.appendChild(sliderButton);

      extensionCardBody.appendChild(extensionCardContent);
      extensionCardBody.appendChild(extensionCardButtons);

      extensionCard.appendChild(extensionCardBody);

      const extensionList=document.getElementById("extensionList");

      extensionList.appendChild(extensionCard);

  });
     
  } catch (error){
    console.error("There was a problem fetching data:", error)
  }
 }

 fetchData();

