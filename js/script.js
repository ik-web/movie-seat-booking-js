import {seatsData} from './seats.js';

document.addEventListener('DOMContentLoaded', () => {

    const startApp = () => {
        const cinemaHall = document.querySelector('#seats-form');

        addSeatsToPage(seatsData, cinemaHall);
        doBookingSeats(cinemaHall);
    };

    const addSeatsToPage = (seatsData, cinemaHall) => {

        seatsData.forEach(rowData => {
            const row = createRow();

            rowData.forEach(seatData => {
                row.innerHTML += createSeat(seatData);
            });

            cinemaHall.append(row);
        })
    }

    const createRow = () => {
        const row = document.createElement('ol');
        row.classList.add('cinema-hall__row');
        return row;
    }

    const createSeat = ({seatId, row, seat, price, booked}) => {
        return `
            <li>
                <label>
                    <input type="checkbox" class="cinema-hall__check" data-row="${row}" data-seat="${seat}" value="${seatId}" data-price="${price}" ${booked ? "disabled" : ""}>
                    <span class="cinema-hall__seat">${seat}</span>
                </label>
            </li>
        `;
    }

    const doBookingSeats = cinemaHall => {
        let ticketsCount = 0;
        let ticketsCost = 0;

        cinemaHall.addEventListener('change', ({target}) => {
            
            const seat = target.closest('input');
            const ticketPrice = +seat.getAttribute('data-price');

            if (!seat) return;
            if (seat.checked) {
                showTicket(seat);
                ticketsCount++
                ticketsCost += ticketPrice;
            } else {
                removeTicket(seat);
                ticketsCount--
                ticketsCost -= ticketPrice;
            };
            showTotalTicketsInfo(ticketsCount, ticketsCost);
            handleTicketList(ticketsCount);
        });
        
        doClickButtons();
    }

    const doClickButtons = () => {
        const modalWindow = document.querySelector('.modal');
        doClickContinueButton(modalWindow);
        doClickReturnButton(modalWindow);
    };

    const doClickContinueButton = modalWindow => {
        const continueButton = document.querySelector('.cinema-hall__btn');

        continueButton.addEventListener('click', () => {
            modalWindow.classList.add('active');
        });
    }

    const doClickReturnButton = modalWindow => {
        const returnButton = document.querySelector('.button--return');

        returnButton.addEventListener('click', () => {
            modalWindow.classList.remove('active');
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

    const getTicketInfo = seat => {
        const ticketId = seat.value;
        const rowNumber = seat.getAttribute('data-row');
        const seatNumber = seat.getAttribute('data-seat');
        const ticketPrice = seat.getAttribute('data-price');
        return {
            ticketId,
            rowNumber,
            seatNumber,
            ticketPrice
        };
    };

    const showTicket = seat => {
        const ticketsList = document.querySelector('.cinema-hall__ticket-list');    
        ticketsList.innerHTML += createTicket(getTicketInfo(seat));
    };

    const removeTicket = ({value}) => {
        const ticket = document.querySelector(`[data-id="${value}"]`);
        ticket.remove();
    };

    const handleTicketList = ticketsCount => {
        const ticketList = document.querySelector('.cinema-hall__tickets');
        const activeTicketList = document.querySelector('.cinema-hall__tickets.active');
        
        if (ticketsCount > 0 && !activeTicketList) showTicketList(ticketList);
        else if (ticketsCount === 0) hideTicketList(ticketList);
    };

    const showTotalTicketsInfo = (ticketsCount, ticketsCost) => {
        document.querySelector('.total-count').innerHTML = `Total ${ticketsCount === 1 ? 'seat' : 'seats'}: ${ticketsCount}`;
        document.querySelector('.total-cost').innerHTML = `Total cost: $${ticketsCost}`;
    };

    const showTicketList = ticketList => {
        ticketList.classList.add('active');
    };

    const hideTicketList = ticketList => {
        ticketList.classList.remove('active');
    };

    startApp();

});
