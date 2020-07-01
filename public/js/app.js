console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageEight = document.querySelector('#message-8')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent=''
    messageFour.textContent=''
    messageFive.textContent=''
    messageEight.textContent=''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                

                 messageOne.textContent = data.location
                 messageTwo.textContent = data.forecast.description
                 messageThree.textContent=data.forecast.temprature
                 messageFour.textContent=data.forecast.pressure
                 messageFive.textContent=data.forecast.humidity
                 messageEight.textContent=data.forecast.sea_level
                 
                 
            }
        })
    })
})