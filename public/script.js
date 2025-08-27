// new user form logic
document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();
        if (response.ok) {
            populateUserSelect();
            alert('Korisnik uspešno dodat!');
        } else {
            alert('Greška: ' + (result.error || 'Neuspešno dodavanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
});

populateUserSelect();
async function populateUserSelect() {
    const res = await fetch('/users');
    const users = await res.json();
    const select = document.getElementById('userSelect');
    select.innerHTML = '';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.name} (${user.email})`;
        select.appendChild(option);
    });
}

// new task form logic
document.getElementById('taskForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userId = document.getElementById('userSelect').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/createTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                title,
                description
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Task uspešno dodat korisnicima!');
        } else {
            alert('Greška: ' + (result.error || 'Neuspešno dodavanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
});