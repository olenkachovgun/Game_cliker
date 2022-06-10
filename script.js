const startBtn =document.querySelector('#start');
const screens =document.querySelectorAll('.screen');
const timeList =document.querySelector('#time-list');
const timeEl=document.querySelector('#time');
const board=document.querySelector('#board');

const colors =['red','yellow','blue','pink','green'];

let time=0; 
let score=0;

//відслідковуємо подію натиснення "ТАК" і змінюємо екран(скрін)
startBtn.addEventListener('click',(event) =>{
    event.preventDefault();
    screens[0].classList.add('up');
});

//Перевіярємо кнопку з часом ми обрали.
//контролюємо через атрибут data-time, який саме час обрали. 
//Зміна скрінів 
timeList.addEventListener('click',(event) => {
    if(event.target.classList.contains('time-btn')){
        time=parseInt(event.target.getAttribute('data-time'));
        console.log(typeof time, time);
        screens[1].classList.add('up');
        startGame(); //запуск гри
    }
})

//board
board.addEventListener('click', event =>{
    //перевірка кліку по кружечку, якщо влучив:
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove(); //видалення кружечка
        createRandomCircle();  //створення випадкового кола
    }
})

//початок гри
function startGame(){
    setInterval(decreaseTime,1000); //встановлюємо інтервал 1с
    createRandomCircle(); //створення випадкового кола
  
}

//1.06.2022
//відлік часу, секундомір
function decreaseTime(){
    if(time===0){
        finishGame()
    }else{
        let current=--time; //зменшення часу
        timeEl.innerHTML=current +' sec.'
    }
}

function finishGame(){
    timeEl.parentNode.classList.add('hide'); //додаємо клас hide
    board.innerHTML = `<h1>Score : <span class="primary">${score}</span></h1>`; //отримуємо фінальний результат
}

//створення кружечків та ігрового поля
function createRandomCircle(){
    const circle = document.createElement('div');//створюємо елемент для кружечка
    const size =getRandomNumber(20,60);  //налаштовуємо розміри його
    const {width, height}=board.getBoundingClientRect();
    const x = getRandomNumber(0,width-size);
    const y =getRandomNumber(0, height-size)
    const randomColorIndex = getRandomNumber(0,colors.length-1)

    //стилізуємо коло
    circle.classList.add('circle');
    circle.style.width=`${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = colors[randomColorIndex]

    board.append(circle); //додаємо на екран коло
}
function getRandomNumber(min,max){
    return Math.round(Math.random()*(max-min)+(min))
}
