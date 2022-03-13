const containerEl = document.querySelector('.container')
const seatEls = document.querySelectorAll('.row .seat:not(.occupied)')
const countEl = document.querySelector('#count')
const totalEl = document.querySelector('#total')
const moviesSelectEl = document.querySelector('#movie')

// select태그에 option태그가 갖고 있는 value가 가격
let ticketPrice = +moviesSelectEl.value

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seatEls.forEach((seat, idx) => {
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if (selectedMovieIndex !== null) {
    moviesSelectEl.selectedIndex = selectedMovieIndex
  }
}

const updatedSelectedCount = () => {
  const selectedSeats = containerEl.querySelectorAll('.seat.selected')

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seatEls].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatesCount = selectedSeats.length
  countEl.innerText = selectedSeatesCount
  totalEl.innerText = selectedSeatesCount * ticketPrice
}

const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Select Movie Event
moviesSelectEl.addEventListener('change', (e) => {
  ticketPrice = +e.target.value
  // console.log(e.target.selectedIndex, +e.target.value)
  setMovieData(e.target.selectedIndex, e.target.value)
  updatedSelectedCount()
})

// Select Seats Event
containerEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updatedSelectedCount()
  }
})

populateUI()
updatedSelectedCount()
