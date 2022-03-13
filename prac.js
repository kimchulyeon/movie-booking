const selectEl = document.querySelector('#movie')

const containerEl = document.querySelector('.container')
const seatEls = document.querySelectorAll('.row .seat:not(.occupied)')

const countText = document.querySelector('#count')
const totalText = document.querySelector('#total')

let moviePrice = selectEl.value

// 결과창 텍스트 업데이트 함수
const textUpdate = () => {
  const selectedSeats = containerEl.querySelectorAll('.seat.selected')

  const selectedSeatsIndex = [...selectedSeats].map((seat) => {
    return [...seatEls].indexOf(seat)
  })
  console.log(selectedSeatsIndex)

  countText.innerText = selectedSeats.length
  totalText.innerText = selectedSeats.length * moviePrice
}

// 영화 목록 바꿀 때 이벤트
selectEl.addEventListener('change', (e) => {
  moviePrice = e.target.value

  textUpdate()
})

// 좌석 누를 때 이벤트
containerEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
  }

  textUpdate()
})
