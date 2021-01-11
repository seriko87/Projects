const buttons = document.querySelectorAll('.project');

buttons.forEach(button =>{
    button.addEventListener('click', function(){
        if (button.innerText === 'Calculator'){
            location.href = './calculator/calculator.html'
        } else if (button.innerText === 'Trivia'){
            location.href = './Trivia battle/index.html';
        } else if (button.innerText === 'To-do app'){
            alert('Coming Soon!!!')
        } else if (button.innerText === 'Nasa Api'){
            location.href = './api/nasa_picture_api/index.html'
        }
        console.log('yes')
    })
})