document.addEventListener('DOMContentLoaded', () => {
  const volunteerBtn = document.getElementById('volunteer-btn');
  const formContainer = document.getElementById('volunteer-form-container');

  if (volunteerBtn && formContainer) {
    volunteerBtn.addEventListener('click', () => {
      formContainer.style.display = 'block';
    });
  }

  // Wildlife API Integration
  const wildlifeContainer = document.getElementById('wildlife-data');
  const loading = document.createElement('p');
  loading.textContent = "Loading wildlife data...";
  wildlifeContainer.appendChild(loading);

  const apiKey = "oNBmr8KNc57Tnh3P6d7oWbzjDbhqKvxWIByF9IkE"; // Optional: paste your NPS API key here
  fetch(`https://developer.nps.gov/api/v1/animals?limit=5&api_key=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error!");
      }
      return response.json();
    })
    .then(data => {
      loading.remove();
      const animals = data.data;
      animals.forEach(animal => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal-card');
        animalDiv.innerHTML = `
          <h3>${animal.commonName}</h3>
          <p><strong>Scientific Name:</strong> ${animal.scientificName}</p>
          <p><strong>Habitat:</strong> ${animal.habitat || "Unknown"}</p>
          <p><strong>Conservation Status:</strong> ${animal.conservationStatus || "Not listed"}</p>
        `;
        wildlifeContainer.appendChild(animalDiv);
      });
    })
    .catch(error => {
      loading.remove();
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "Oops! Could not load wildlife data at this time.";
      wildlifeContainer.appendChild(errorMsg);
      console.error(error);
    });
});
