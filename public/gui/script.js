/*import {
  isValid
} from 'validation.js';*/
// Handle field visibility based on selected method
document.addEventListener('DOMContentLoaded', function() {
  const methodSelect = document.getElementById('method');
  const defaultMethod = 'GET'; // Choose your default method
  methodSelect.value = defaultMethod;

  // Call toggleFields() to adjust the visible fields based on the selected method
  toggleFields();
});
function toggleFields() {
  const method = document.getElementById('method').value;
  console.log(method);
  const idField = document.getElementById('id-field');
  const typeField = document.getElementById('type-field');
  const descriptionField = document.getElementById('description-field');
  const linkField = document.getElementById('link-field');
  const key = document.getElementById('key-field');
  const sharedBy = document.getElementById('sharedBy-field');

  // Show/Hide based on method selection
  if (method === 'GET') {
    idField.style.display = 'block'; // Optional for GET if querying by ID
    typeField.style.display = 'none';
    descriptionField.style.display = 'none';
    sharedBy.style.display = 'none';
    linkField.style.display = 'none';
    key.style.display = 'none';
  } else if (method === 'POST') {
    key.style.display = 'block';
    idField.style.display = 'none';
    typeField.style.display = 'block';
    descriptionField.style.display = 'block';
    linkField.style.display = 'block';
    sharedBy.style.display = 'block';
    //typeField.setAttribute('required', true);
    typeField.required = true;
  } else if (method === 'PUT') {
    key.style.display = 'block';
    idField.style.display = 'block'; // Required for PUT
    typeField.style.display = 'block';
    descriptionField.style.display = 'block';
    linkField.style.display = 'block';
    sharedBy.style.display = 'block';
  } else if (method === 'DELETE') {
    key.style.display = 'block';
    idField.style.display = 'block'; // Required for DELETE
    typeField.style.display = 'none';
    descriptionField.style.display = 'none';
    linkField.style.display = 'none';
  }
}

// Handle form submission
const form = document.getElementById('api-form');
console.log(form);
form.addEventListener('submit', function(event) {
  console.log('sucks');
  //event.preventDefault(); // Prevent the form from refreshing the page
  const method = document.getElementById('method').value;
  const apiKey = document.getElementById('api-key').value;
  const id = document.getElementById('id').value;
  const link = document.getElementById('link').value;
  const type = document.getElementById('type').value;
  let valid = false;
  /*if (!method === 'GET') {
    valid = isValid(method, apiKey, type, link, id);
  }
  console.log(valid);*/
  /*
  const description = document.getElementById('description').value;
  */

  // Form the request based on method
  let url = 'http://localhost:4000/links';
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      //'x-api-key': apiKey
    }
  };

  if (method === 'GET') {
    if (id) url += `/${id}`;
  } else if (method === 'POST' || method === 'PUT') {
    if (method === 'PUT' && id) url += `/${id}`;
    options.body = JSON.stringify({
      type: type,
      description: description,
      link: link
    });
  } else if (method === 'DELETE') {
    if (id) url += `/${id}`;
  }
  console.log(method);
  console.log(type);
  console.log(id);
  // Fetch request
  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    document.getElementById('output').innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    document.getElementById('output').innerText = `Error: ${error.message}`;
  });
});