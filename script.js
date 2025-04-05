const form = document.getElementById('crud-form');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const dataList = document.getElementById('data-list');

//   data from localStorage or initialize an empty array
let data = JSON.parse(localStorage.getItem('data')) || [];

// Function to render the table rows
function renderTable() {
  dataList.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button class="edit-btn" onclick="editItem('${item.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
      </td>
    `;
    dataList.appendChild(tr);
  });
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('data', JSON.stringify(data));
  renderTable();
}

// Add new item
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = inputName.value.trim();
  const email = inputEmail.value.trim();

  if (name && email) {
    const newItem = { id: Date.now().toString(), name, email };
    data.push(newItem);
    saveData();
    inputName.value = '';
    inputEmail.value = '';
  }
});

// Delete item
function deleteItem(id) {
  data = data.filter(item => item.id !== id);
  saveData();
}

// Edit item
function editItem(id) {
  const item = data.find(item => item.id === id);
  
  const newName = prompt('Edit name:', item.name);
  const newEmail = prompt('Edit email:', item.email);

  if (newName !== null && newEmail !== null) {
    item.name = newName.trim();
    item.email = newEmail.trim();
    saveData();
  }
}

// Initial render 
renderTable();
