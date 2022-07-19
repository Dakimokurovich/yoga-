window.addEventListener('DOMContentLoaded', function(){

        'use strict';
        let tab = document.querySelectorAll('.info-header-tab'),
            info = document.querySelector('.info-header'),
            tabContend = document.querySelectorAll('.info-tabcontent');

        function hideTabContent(a){
            for(let i = a; i <tabContend.length; i++){
                tabContend[i].classList.remove('show');
                tabContend[i].classList.add('hide');
            }
        }

        hideTabContent(1);

        function showTabContend(b){
            if (tabContend[b].classList.contains('hide')){
                tabContend[b].classList.remove('hide');
                tabContend[b].classList.add('show');
            }
        }

        info.addEventListener('click', function(event) {
            let target = event.target;
            if (target && target.classList.contains('info-header-tab')) {
                for(let i = 0; i < tab.length; i++){
                    if (target ==tab[i]){
                        hideTabContent(0);
                        showTabContend(i);
                        break;   
                    }
                }
            }
        });

        // Timer 

        let deadline = '2024-01-01';

        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60), 
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }

        function setClock(id, endtime) {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);

            function updateClock() {
                let t = getTimeRemaining(endtime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;

                if(t.total <=0){
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('timer', deadline); 

        // Modal

        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close');

        more.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; // Запрет на прокрутку страници когда открыто модальное окно 
        });

         close.addEventListener('click', function() {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
         });

         //from

         let message = {
             loading: 'Загрузка...',
             success: 'Спасибо! Скоро мы с вами свяжемся',
             failure: 'Что-то пошло не так...'
         };

         let form = document.querySelector('.main-form'),
             input = form.getElementsByTagName('input'),
             statusMessage = document.createElement('div');

             statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(form);
            request.send(formData);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                }else if(request.readyState === 4 && request.status === 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for(i = 0; input < input.length; i++) {
                input[i].value = '';
            }
        });

        // Slider

        let slideIndex = 1,
            slides = document.querySelectorAll('.slider-item'),
            prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            dotsWrap = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');

            showSlides(slideIndex);

        function showSlides(n) {

            if(n > slides.length) {
                slideIndex = 1;
            }
            if(n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));

            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }    

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });

        next.addEventListener('click', function() {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', function(event) {
            for (let i = 0; i < dots.length + 1; i++) {
                if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlide(i);
                }
            }
        });

        //Calc

        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personsSum = 0,
            daysSum = 0,
            total = 0;

            totalValue.innerHTML = 0;

            persons.addEventListener('change', function() {
                personsSum = +this.value;
                total = (daysSum + personsSum)*4000;

                if(restDays.value == '') {
                    totalValue.innerHTML = 0;
                }else {
                    totalValue.innerHTML = total;
                }
            });

            restDays.addEventListener('change', function() {
                daysSum = +this.value;
                total = (daysSum + personsSum)*4000;

                if(persons.value == '') {
                    totalValue.innerHTML = 0;
                }else {
                    totalValue.innerHTML = total;
                }
            });

            place.addEventListener('change', function() {
                if (restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                }else {
                    let a = total;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
            });
});

