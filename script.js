
function listReservations() {
    fetch('db.json')
    .then(response => response.json())
    .then(data => {
        let reservations = '';
        data.foglalasok.forEach(reservation => {
            reservations += `<tr>
                <td>${reservation.datum}</td>
                <td>${reservation.nev}</td>
                <td>${reservation.fo}</td>
                <td>${reservation.cim}</td>
                <td>${reservation.iranyitoszam}</td>
            </tr>`;
        });
        const reservationTable = `
        <div class="modal fade" id="reservationModal" tabindex="-1" role="dialog" aria-labelledby="reservationModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reservationModalLabel">Foglalások listája</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Dátum</th>
                                    <th>Név</th>
                                    <th>Fő</th>
                                    <th>Helyszín</th>
                                    <th>Irányítószám</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reservations}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;

        $('#reservationModal').remove();

        $('body').append(reservationTable);

        $('#reservationModal').modal('show');
    })
    .catch(error => {
        console.error('Hiba történt:', error);
        alert('Hiba történt a foglalások lekérése során.');
    });
    function addReservation(formData) {
        fetch('http://localhost:3000/foglalasok', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba történt a foglalás felvétele során.');
            }
            alert('A foglalás sikeresen felvéve!');
            $('#reservationModal').modal('hide'); 
            location.reload();
        })
        .catch(error => {
            console.error('Hiba történt:', error);
            alert('Hiba történt a foglalás felvétele során.');
        });
    }
    
    function handleAddReservation(event) {
        event.preventDefault();
        const formData = {
            cim: document.getElementById('cimInput').value,
            datum: document.getElementById('datumInput').value,
            fo: document.getElementById('foInput').value,
            iranyitoszam: document.getElementById('iranyitoszamInput').value,
            nev: document.getElementById('nevInput').value
        };
        addReservation(formData);
    }
    
    document.getElementById('addReservationForm').addEventListener('submit', handleAddReservation);
}