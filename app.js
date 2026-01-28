 // Constants
 const CONFIG={
  JSON_FILE_PATH: "./data.json",
  SELECTORS:{
    EXTENSION_LIST: "#extensionList",
  },
  CLASSES:{
    CARD: "extension-card",
    CARD_BODY:"card-body",
    CARD_CONTENT:"card-content",
    CARD_BUTTONS:"card-btns",
    LOGO:"extension-logo",
    SLIDER_BTN: "slider-btn",
    REMOVE_BTN: "remove-btn",
  },
  TEXT_CONTENT:{
    BUTTONS:{
      REMOVE: "remove",
    },
  }
 }

 // Create extension card element
 function createExtensionCard(extension){
  const card=document.createElement("div");
      card.classList.add(CONFIG.CLASSES.CARD);

      const cardBody=document.createElement("div");
      cardBody.classList.add(CONFIG.CLASSES.CARD_BODY);

      const cardContent=document.createElement("div");
      cardContent.classList.add(CONFIG.CLASSES.CARD_CONTENT);

      const img=document.createElement("img");
      img.src=extension.logo;
      img.alt=extension.name;
      img.classList.add(CONFIG.CLASSES.LOGO);

      const heading=document.createElement("h2");
      heading.textContent=extension.name;


      const description=document.createElement("p");
      description.textContent=extension.description;

      cardContent.appendChild(img);
      cardContent.appendChild(heading);
      cardContent.appendChild(description);

      const buttons=createCardButtons();
      cardBody.appendChild(cardContent);
      cardBody.appendChild(buttons);
      card.appendChild(cardBody);

    return card;

 }

 //Create button container
 function createCardButtons(){
  const container=document.createElement("div");
      container.classList.add(CONFIG.CLASSES.CARD_BUTTONS);

      const removeBtn=document.createElement("button");
      removeBtn.textContent=CONFIG.TEXT_CONTENT.BUTTONS.REMOVE
      removeBtn.classList.add(CONFIG.CLASSES.REMOVE_BTN);
      
      const sliderBtn=document.createElement("button");
      sliderBtn.textContent="slide"
      sliderBtn.classList.add(CONFIG.CLASSES.SLIDER_BTN);


      container.appendChild(removeBtn);
      container.appendChild(sliderBtn);

      return container;
 }
 

// Fetch Data
 async function fetchData(){
  try {
     const response = await fetch(CONFIG.JSON_FILE_PATH);

     if (!response.ok){
      throw new Error(`Network error: " + ${response.statusText}`);
     }

     const extensions = await response.json();
    renderExtensions(extensions);
     
  } catch (error){
    console.error("Failed to fetch data:", error);
    displayErrorMessage("Unable to load extensions")
  }
 }

 // Render extensions to DOM
 function renderExtensions(extensions){
  const listContainer = document.querySelector(CONFIG.SELECTORS.EXTENSION_LIST);

  if (!listContainer){
    console.error("Extension list container not found");
    return;
  }

  console.log("extension: ", extensions);
  console.log("isArray:", Array.isArray(extensions));
  console.log("type:", typeof extensions);

  extensions.forEach(extension => {
    const card = createExtensionCard(extension);
    listContainer.appendChild(card);
  });
 }

 //Display error message
 function displayErrorMessage(message){
  const listContainer = document.querySelector(CONFIG.SELECTORS.EXTENSION_LIST);

  if(listContainer){
    listContainer.textContent = message;
  }
 }

 fetchData();

