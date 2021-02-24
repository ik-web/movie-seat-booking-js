document.addEventListener('DOMContentLoaded', () => {

    const ticketPrice = 4;

    const startApp = () => {
        bookingSeats();
    };

    const bookingSeats = () => {
        const cinemaHall = document.querySelector('#seats-form');

        cinemaHall.addEventListener('change', ({target}) => {
            
            const seat = target.closest('input');
            if (!seat) return;
            if (seat.checked) addTicket(seat);
            else removeTicket(seat);
            ticketListHandler();

        });
    }

    const createTicket = ({ticketId, rowNumber, seatNumber, ticketPrice}) => {
        return `
            <div class="cinema-hall__ticket" data-id="${ticketId}">
                <div class="seat-info">
                    Row: <span class="seat-info__row">${rowNumber}</span> --- Seat: <span class="seat-info__seat">${seatNumber}</span>
                </div>
                <div class="ticket-price">
                    ${ticketPrice}
                </div>
            </div>
        `;
    };

    const addTicket = seat => {
        const ticketsList = document.querySelector('.cinema-hall__ticket-list');    
        ticketsList.innerHTML += createTicket(createTicketInfo(seat));
    };

    const createTicketInfo = seat => {
        const ticketId = seat.value;
        const rowNumber = seat.getAttribute('data-row');
        const seatNumber = seat.getAttribute('data-seat');
        return {
            ticketId,
            rowNumber,
            seatNumber,
            ticketPrice
        };
    };

    const removeTicket = ({value}) => {
        const ticket = document.querySelector(`[data-id="${value}"]`);
        ticket.remove();
    };

    const showticketList = ticketList => {
        ticketList.classList.add('active');
    };

    const hideticketList = ticketList => {
        ticketList.classList.remove('active');
    };

    const totalHandler = selectedTicketsCount => {
        const ticketCount = document.querySelector('.total-count');
        const ticketsCost = document.querySelector('.total-cost');
        ticketCount.innerHTML = `Total ${selectedTicketsCount > 1 ? 'tickets' : 'ticket'}: ${selectedTicketsCount}`;
        ticketsCost.innerHTML = `Total cost: $${selectedTicketsCount * ticketPrice}`;
    };

    const ticketListHandler = () => {
        const selectedTicketsCount = document.querySelectorAll('.cinema-hall__ticket').length;
        const ticketList = document.querySelector('.cinema-hall__tickets');
        const activeTicketList = document.querySelector('.cinema-hall__tickets.active');
        if (selectedTicketsCount > 0 && !activeTicketList) showticketList(ticketList);
        else if (selectedTicketsCount === 0) hideticketList(ticketList);
        totalHandler(selectedTicketsCount);
    };

    startApp();

});
