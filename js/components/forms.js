"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    if (!form) return; // Защита, если формы нет на странице

    // Находим инпут email и кнопку внутри формы
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. ВАЛИДАЦИЯ
        // Очищаем предыдущие ошибки
        form.querySelectorAll('._error').forEach(el => el.classList.remove('_error'));
        emailInput.parentElement.classList.remove('_error');

        let error = 0;
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простая и надежная регулярка для email

        if (emailValue === '') {
            emailInput.parentElement.classList.add('_error');
            error++;
        } else if (!emailRegex.test(emailValue)) {
            emailInput.parentElement.classList.add('_error');
            error++;
        }

        // Если есть ошибки — прерываем отправку
        if (error > 0) {
            return;
        }

        // 2. ОТПРАВКА (Web3Forms)
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                alert('Thank you! Your email has been sent successfully.');
                form.reset(); // Очищаем форму
            } else {
                alert('Error: ' + (data.message || 'Please try again later.'));
            }
        } catch (error) {
            alert('Connection error. Please check your internet.');
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    // Очистка ошибки при вводе текста в инпут
    emailInput.addEventListener('input', function () {
        this.parentElement.classList.remove('_error');
    });
});