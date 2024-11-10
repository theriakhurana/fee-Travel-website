document.addEventListener("DOMContentLoaded", () => {
    // Load packages for the current destination
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dubai.html')) {
        loadPackagesForDestination('dubai');
    } else if (currentPage.includes('bali.html')) {
        loadPackagesForDestination('bali');
    } else if (currentPage.includes('australia.html')) {
        loadPackagesForDestination('australia');
    } else if (currentPage.includes('paris.html')) {
        loadPackagesForDestination('paris');
    }
});

// packages on each page
function loadPackagesForDestination(destination) {

  fetch('info.json') 
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const packages = data.packages;
          const packageSection = document.querySelector('#packages');

          packageSection.innerHTML = '';
          const filteredPackages = packages.filter(pkg => pkg.destination === destination);

          filteredPackages.forEach(pkg => {

              const packageDiv = document.createElement('div');
              packageDiv.classList.add('package');

              // Add the image
              const packageImage = document.createElement('img');
              packageImage.src = pkg.image; 
              packageImage.alt = pkg.name;

              // Add description and price
              // const packageDescription = document.createElement('p');
              // packageDescription.textContent = pkg.description;

              const packagePrice = document.createElement('span');
              packagePrice.textContent = pkg.price;

              const bookButton = document.createElement('button');
              bookButton.textContent = 'Book';
              bookButton.classList.add('btn');
              
              const packageId = pkg.id;
              bookButton.addEventListener('click', () => {
                window.location.href = `booking.html?packageId=${packageId}`;
              });

              packageDiv.appendChild(packageImage);
              // packageDiv.appendChild(packageDescription);
              packageDiv.appendChild(packagePrice);
              packageDiv.appendChild(bookButton);

              packageSection.appendChild(packageDiv);
          });

          if (filteredPackages.length === 0) {
              packageSection.innerHTML = '<p>No packages available for this destination.</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching the JSON file:', error);
        });
}


//--------------------------------------------------------------------
//dubai event listener
const destinationDubai = document.querySelector("#dubai");
destinationDubai.addEventListener("click", () => {
    const destinationId = destinationDubai.id;
    window.location.href = `tourPages/dubai.html`;
});

//new York event listener
const destinationBali = document.querySelector("#bali");
destinationBali.addEventListener("click", () => {
    const destinationId = destinationBali;
    window.location.href = `tourPages/bali.html`;
});

//paris event listener
const destinationParis = document.querySelector("#paris");
destinationParis.addEventListener("click", () => {
    const destinationId = destinationParis.id;
    window.location.href = `tourPages/paris.html`;
});

//new delhi event listener
const destinationAustralia = document.querySelector("#australia");
destinationAustralia.addEventListener("click", () => {
    const destinationId = destinationAustralia.id;
    window.location.href = `tourPages/australia.html`;
});
//-------------------------------------------------------------------

/* Search bar implementation*/
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById('search-bar');
    const suggestionsList = document.getElementById('suggestions');

    const locations = [
        "Dubai",
        "Bali",
        "Paris",
        "Australia",
        "New York",
    ];

    searchBar.addEventListener('focus', () => {
        suggestionsList.innerHTML = '';
        locations.forEach(location => {
            const listItem = document.createElement('li');
            listItem.textContent = location;

            // Add click event to each suggestion
            listItem.addEventListener('click', () => {
                searchBar.value = location;
                suggestionsList.innerHTML = '';
            });

            suggestionsList.appendChild(listItem);
        });
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && !suggestionsList.contains(event.target)) {
            suggestionsList.innerHTML = ''; // Clear suggestions when clicking outside
        }
    });
});


//------------------------------------------------------
/*Switch to dark mode */
const mode = document.querySelector('#mode');

mode.addEventListener('click', () =>{
  document.body.classList.toggle('darkmode');

  if(document.body.classList.containes('Dark Mode')){
    mode.style.backgroundColor = 'white';
    mode.style.color ='black';
  }
  else{
    mode.style.backgroundColor = 'black';
    mode.style.color = 'white';
  }
})