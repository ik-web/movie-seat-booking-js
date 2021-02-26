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
        const selectedSeatsTotal = document.querySelector('.cinema-hall__seats-total');
        const modal = document.querySelector('.modal__info');
        let selectedSeatsCount = 0;
        let selectedSeatsCost = 0;

        cinemaHall.addEventListener('change', ({target}) => {
            
            const seat = target.closest('input');
            const seatPrice = +seat.getAttribute('data-price');

            if (!seat) return;
            if (seat.checked) {
                showSelectedSeat(seat);
                selectedSeatsCount++
                selectedSeatsCost += seatPrice;
            } else {
                removeSelectedSeat(seat);
                selectedSeatsCount--
                selectedSeatsCost -= seatPrice;
            };
            showTotalSelectedSeatsInfo(selectedSeatsCount, selectedSeatsCost, selectedSeatsTotal);
            showTotalSelectedSeatsInfo(selectedSeatsCount, selectedSeatsCost, modal);
            handleSelectedSeatsList(selectedSeatsCount);
        });
        
        doClickButtons();

    }

    const doClickButtons = () => {
        const modalWindow = document.querySelector('.modal');
        doClickButtonContinue(modalWindow);
        doClickButtonReturn(modalWindow);
    };

    const doClickButtonContinue = modalWindow => {
        const buttonContinue = document.querySelector('.cinema-hall__button');

        buttonContinue.addEventListener('click', () => {
            modalWindow.classList.add('active');
        });
    }

    const doClickButtonReturn = modalWindow => {
        const buttonReturn = document.querySelector('.button--return');

        buttonReturn.addEventListener('click', () => {
            modalWindow.classList.remove('active');
        });
    }

    const addSelectedSeat = ({selectedSeatId, rowNumber, seatNumber, selectedSeatPrice}) => {
        return `
            <div class="cinema-hall__selected-seat" data-id="${selectedSeatId}">
                <div class="seat-info">
                    Row: <span class="seat-info__row">${rowNumber}</span> --- Seat: <span class="seat-info__seat">${seatNumber}</span>
                </div>
                <div class="seat-price">
                    ${selectedSeatPrice}
                </div>
            </div>
        `;
    };

    const getSelectedSeat = seat => {
        const selectedSeatId = seat.value;
        const rowNumber = seat.getAttribute('data-row');
        const seatNumber = seat.getAttribute('data-seat');
        const selectedSeatPrice = seat.getAttribute('data-price');
        return {
            selectedSeatId,
            rowNumber,
            seatNumber,
            selectedSeatPrice
        };
    };

    const showSelectedSeat = seat => {
        const selectedSeatsList = document.querySelector('.cinema-hall__selected-seats-list');
        selectedSeatsList.innerHTML += addSelectedSeat(getSelectedSeat(seat));
    };

    const removeSelectedSeat = ({value}) => {
        const selectedSeat = document.querySelector(`[data-id="${value}"]`);
        selectedSeat.remove();
    };

    const handleSelectedSeatsList = selectedSeatsCount => {
        const selectedSeatsList = document.querySelector('.cinema-hall__selected-seats');
        const activeSelectedSeatsList = document.querySelector('.cinema-hall__selected-seats.active');
        
        if (selectedSeatsCount > 0 && !activeSelectedSeatsList) showSelectedSeatsList(selectedSeatsList);
        else if (selectedSeatsCount === 0) hideSelectedSeatsList(selectedSeatsList);
    };

    const showTotalSelectedSeatsInfo = (selectedSeatsCount, selectedSeatsCost, pageElement) => {
        pageElement.innerHTML = getTotalSelectedSeatsInfo(selectedSeatsCount, selectedSeatsCost);
    };

    const getTotalSelectedSeatsInfo = (selectedSeatsCount, selectedSeatsCost) => {
        return `
            <p>Total selected ${selectedSeatsCount === 1 ? 'seat' : 'seats'}: ${selectedSeatsCount}</p>
            <p>Total cost: $${selectedSeatsCost}</p>
        `;
    };

    const showSelectedSeatsList = selectedSeatsList => {
        selectedSeatsList.classList.add('active');
    };

    const hideSelectedSeatsList = selectedSeatsList => {
        selectedSeatsList.classList.remove('active');
    };

    startApp();

});
