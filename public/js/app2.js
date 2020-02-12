console.log('script isa working')



// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data) 
//         }


//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector('#error')
const forecast = document.querySelector('#forecast')

error.textContent = 'From javascript'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    forecast.textContent = "loading..."
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecast.textContent = data.error
            } else {
                console.log(data)
                forecast.textContent = `location: ${data.location}------forecast: ${data.forecast.temp}, ${data.forecast.weather}-----------------high: ${data.forecast.high}`
            }


        })
    })

}) 