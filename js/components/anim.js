// "use strict"

// const options = {
// 	root: null,
// 	rootMargin: "0px 0px -50px 0px",
// 	threshold: 0.2,
// }

// const callback = (entries, observer) => {
// 	entries.forEach(entry => {
// 		const currentElement = entry.target
// 		if (entry.isIntersecting) {
// 			currentElement.classList.add('--animate')
// 		} else {
// 			currentElement.classList.remove('--animate')
// 		}
// 	})
// }

// const observer = new IntersectionObserver(callback, options)

// // Ищем секции с классом .anim (а не [class*="--anim"])
// const animElements = document.querySelectorAll('.anim')
// animElements.forEach(animElement => {
// 	observer.observe(animElement)
// })

"use strict"

const options = {
	root: null,
	rootMargin: "0px 0px 0px 0px", // убрал отрицательный отступ — он мешал срабатыванию
	threshold: 0, // срабатывает при первом же касании вьюпорта (даже 1px)
}

const callback = (entries, observer) => {
	entries.forEach(entry => {
		const currentElement = entry.target

		if (entry.isIntersecting) {
			// Добавляем --animate самой секции
			currentElement.classList.add('--animate')

			// И всем вложенным элементам с классами anim--*
			const children = currentElement.querySelectorAll('[class*="anim--"]')
			children.forEach(child => child.classList.add('--animate'))

			// Отписываемся — анимация сработает только один раз
			// observer.unobserve(currentElement)
		}
	})
}

const observer = new IntersectionObserver(callback, options)

// Наблюдаем за секциями с классом .anim
const animElements = document.querySelectorAll('.anim')
animElements.forEach(animElement => {
	observer.observe(animElement)
})