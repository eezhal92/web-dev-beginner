const serverBaseURL = 'https://student-rest-mock-api.vercel.app/api';

const form = document.getElementById('form');

getAllStudents()
  .then((students) => {
    for (let i = 0; i < students.length; i++) {
      const { id, name, age } = students[i];
      const studentCard = createStudentCard(id, name, age);
      addToContainer(studentCard);
    }
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.nama.value;
  const age = parseInt(form.umur.value, 10);

  createStudent(name, age)
    .then((data) => {
      const { id, name, age } = data.newStudent;
      const studentCard = createStudentCard(id, name, age);
      addToContainer(studentCard);
    })
    .catch((error) => {
      alert(`Oops, ada error: ${error.message}`);
    });
});


function createStudentCard(id, name, age) {
  const div = document.createElement('div');
  div.setAttribute('class', 'student-card');

  const nameP = document.createElement('p');
  nameP.setAttribute('class', 'student-name');
  const ageP = document.createElement('p');

  nameP.innerText = name;
  ageP.innerText = age;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'delete-btn');
  deleteBtn.innerText = 'Hapus';

  function handleDeleteClick() {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    removeStudent(id)
      .then(() => {
        deleteBtn.removeEventListener('click', handleDeleteClick);
        div.parentNode.removeChild(div);
      });
  }

  deleteBtn.addEventListener('click', handleDeleteClick);

  div.appendChild(nameP);
  div.appendChild(ageP);
  div.appendChild(deleteBtn);

  return div;
}

function addToContainer(studentCard) {
  const container = document.getElementById('container');

  container.appendChild(studentCard);
}

function createStudent(name, age) {
  return fetch(`${serverBaseURL}/students`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      age,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      if (res.status === 201) {
        return res.json();
      }

      throw new Error(`Cannot create new data. status: ${res.status}`);
    });
}

function getAllStudents() {
  return fetch(`${serverBaseURL}/students`, {
    method: 'GET',
  })
    .then(response => response.json());
}

function removeStudent(id) {
  return fetch(`${serverBaseURL}/students/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Could not delete student!');
      }

      return response.json();
    });
}
