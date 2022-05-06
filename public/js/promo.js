// console.log('Форма создания Акции')

const formPromo = document.querySelector('#formPromo')

formPromo?.addEventListener('submit', async e => {

    let first = Math.floor(Math.random() * (6 - 1)) + 1
    let second = Math.floor(Math.random() * (11 - 6)) + 6
    let third = Math.floor(Math.random() * (16 - 11)) + 11
    let arr = [first,second,third]

    e.preventDefault()
    const titlePromo = e.target.titlePromo.value
    const descriptionPromo = e.target.descriptionPromo.value
    const startDate = e.target.startDate.value
    const endDate = e.target.endDate.value
    const promoObj = {titlePromo, descriptionPromo,startDate,endDate, arr}
    if (titlePromo && descriptionPromo && startDate && endDate) {
        const response = await fetch('/promo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(promoObj)
        })
    }
})

// Листаем слайды акций
const  slidesPromo  = ( activeSlide = 1) => {
    const slides = document.querySelectorAll('.slidePromo')
    slides[activeSlide].classList.add('activePromo')

    for ( let slide of slides) {
        slide.addEventListener('click', () => {
            clearActiveClasses()

            slide.classList.add('activePromo')
        })
    }

    function clearActiveClasses() {
        slides.forEach( slide => {
            slide.classList.remove('activePromo')
        })
    }



}

slidesPromo()



