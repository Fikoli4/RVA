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
            alert('Korisnik uspešno dodat!');
        } else {
            alert('Greška: ' + (result.error || 'Neuspešno dodavanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
});