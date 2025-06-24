


const currentUrl = window.location.pathname;

const links = document.querySelectorAll('.tab-button');

links.forEach(link => {

  // Use direct equality for comparison
  if (link.href === window.location.origin + currentUrl) {
    link.classList.add('active-link');
  }
});



  












// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");



document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.overflow-hidden');

  dropdowns.forEach(dropdown => {
      const header = dropdown.querySelector('div');
      const optionsList = dropdown.querySelector('ul');
      const options = optionsList.querySelectorAll('li');
      const headerTextElement = header.querySelector('p');
      const inputElement = document.createElement('input');
      inputElement.type = 'hidden';
      inputElement.name = headerTextElement.textContent.toLowerCase().replace(' ', '_');
      dropdown.appendChild(inputElement);

      // Rendre la liste déroulante visible au chargement
      optionsList.classList.remove('hidden');

      header.addEventListener('click', function() {
          // Empêcher la fermeture quand on clique sur l'en-tête
          event.stopPropagation();
      });

      options.forEach(option => {
          option.addEventListener('click', function() {
              headerTextElement.textContent = this.textContent;
              inputElement.value = this.textContent;

              // Retirer la classe 'active' de toutes les options
              options.forEach(opt => opt.classList.remove('bg-gray-200', 'text-gray-800'));

              // Ajouter une classe 'active' à l'option sélectionnée
              this.classList.add('bg-gray-200', 'text-gray-800');

              checkIfSelectionsAreMade();
              event.stopPropagation();
          });
      });
  });

  function checkIfSelectionsAreMade() {
      const nbEmployesSelected = document.querySelector('.overflow-hidden:first-child li.bg-gray-200') !== null;
      const secteurActivitesSelected = document.querySelector('.overflow-hidden:last-child li.bg-gray-200') !== null;
      const submitButton = document.querySelector('button[type="submit"]');

      if (nbEmployesSelected && secteurActivitesSelected) {
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove('bg-[#8f59b7]');
          submitButton.classList.add('bg-green-500');
      } else {
          submitButton.setAttribute('disabled', 'true');
          submitButton.classList.remove('bg-green-500');
          submitButton.classList.add('bg-[#8f59b7]');
      }
  }

  checkIfSelectionsAreMade();

  // Empêcher la fermeture des dropdowns quand on clique à l'intérieur
  document.addEventListener('click', function(event) {
      if (event.target.closest('.overflow-hidden')) {
          event.stopPropagation();
      } else {
          // Si on clique en dehors, on ne fait rien car on veut qu'ils restent ouverts
      }
  });
});

