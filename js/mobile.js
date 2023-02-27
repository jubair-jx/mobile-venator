const getPhoneData = (searchHere, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchHere}`;
  fetch(url)
    .then((res) => res.json())
    .then((phone) => getDataFromApi(phone.data, dataLimit));
};

const getDataFromApi = (data, dataLimit) => {
  let mainContainer = document.getElementById("main-container");
  mainContainer.innerText = "";

  let showAll = document.getElementById("show-all");
  if (dataLimit && data.length > 10) {
    data = data.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //stop spinner function
  toggleSpinners(false);

  let noFound = document.getElementById("no-found");
  if (data.length === 0) {
    noFound.classList.remove("d-none");
  } else {
    noFound.classList.add("d-none");
  }
  data.forEach((detail) => {
    let createElement = document.createElement("div");
    createElement.innerHTML = `
    <div class="col">
    <div class="card rounded-3">
      <img src="${detail.image}" class="card-img-top w-50 mx-auto pt-3" alt="">
      <div class="card-body">
        <h4 class="card-title">${detail.brand}</h4>
        <h5 class="card-title">${detail.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button class= "btn btn-primary">Details</button>
      </div>
    </div>
  </div>
    
    `;
    mainContainer.appendChild(createElement);
    // console.log(detail);
  });
};

const processSearch = (dataLimit) => {
  toggleSpinners(true);
  const getTheValue = document.getElementById("input-value").value;
  getPhoneData(getTheValue, dataLimit);
  //start spinner functions
};

//search function

const searchButton = () => {
  processSearch(10);
};

//spinners functions

const toggleSpinners = (isLoading) => {
  let loadSpinners = document.getElementById("spinners");
  if (isLoading) {
    loadSpinners.classList.remove("d-none");
  } else {
    loadSpinners.classList.add("d-none");
  }
};

//show all button work
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});
