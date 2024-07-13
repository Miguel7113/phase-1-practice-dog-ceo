console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('breed-list');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Function to display breeds
    const displayBreeds = (breeds) => {
        breedList.innerHTML = '';
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            li.addEventListener('click', () => {
                li.style.color = 'blue'; // Change to any color you prefer
            });
            breedList.appendChild(li);
        });
    };

    // Fetch random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = "Random Dog Image";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch list of dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);

            // Initial display of all breeds
            displayBreeds(breeds);

            // Filter breeds based on selected letter
            breedDropdown.addEventListener('change', () => {
                const selectedLetter = breedDropdown.value;
                const filteredBreeds = selectedLetter === 'all' 
                    ? breeds 
                    : breeds.filter(breed => breed.startsWith(selectedLetter));
                displayBreeds(filteredBreeds);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
});
