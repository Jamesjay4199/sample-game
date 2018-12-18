let app = new Vue({
    el: "#app",
    data: {
        index: 1,
        animals: [],
        questions: [],
        startSecond: 4,
        gameStarted: false,
        hasAnswered: false,
        displayIntro: false,
        selectedQuestion: {},
        isTimerRunning: false,
        showingQuestion: false,
        hasSelectedAnimal: false,
        displayInstruction: false,
    },
    watch: {
    },
    mounted () {
        // this.introduction()
        this.animals = [
            {
                name: "turtle",
                image: "turtle.png",
                isFound: false
            },
            {
                name: "seal",
                image: "seal.png",
                isFound: false
            },
            {
                name: "rhinoceros",
                image: "rhinoceros.png",
                isFound: false
            },
            {
                name: "otter",
                image: "otter.png",
                isFound: false
            },
            {
                name: "koala",
                image: "koala.png",
                isFound: false
            },
            {
                name: "iguana",
                image: "iguana.png",
                isFound: false
            },
            {
                name: "horse",
                image: "horse.png",
                isFound: false
            },
            {
                name: "hippo",
                image: "hippo.png",
                isFound: false
            },
            {
                name: "elephant",
                image: "elephant.png",
                isFound: false
            },
            {
                name: "crocodile",
                image: "crocodile.png",
                isFound: false
            }
        ];

        this.animals = this.shuffle(this.animals);
        this.questions = [
            {
                question: "The trapped workers in the factory______________out by the time the fire brigade came",
                options: [
                    "got", "had gotten", "was getting"
                ],
                answer: "had gotten"
            },
            {
                question: "By the time the worker reached home, his children______________to bed.",
                options: [
                    "went", "had gone", "were going"
                ],
                answer: "had gone"
            },
            {
                question: "I______________watched tortoise in the animal enclosure when I felt the tremors of an earth quake",
                options: [
                    "watched", "had watched", "was watching"
                ],
                answer: "was watching"
            },
            {
                question: "The villagers______________when the typhoon hit the coastal areas",
                options: [
                    "slept", "had slept", "were sleeping"
                ],
                answer: "were sleeping"
            },
            {
                question: "By the time the zoo keepers arrived from the den, the lion______________from the den.",
                options: [
                    "escaped", "had escaped", "were escaping"
                ],
                answer: "had escaped"
            },
            {
                question: "The tsunami______________through the village leaving destruction in uts wake last year",
                options: [
                    "swept", "had swept", "was sweeping"
                ],
                answer: "swept"
            },
            {
                question: "The newspaper reported that the experts______________that the phenomenon was an unnatural event",
                options: [
                    "claimed", "had claimed", "were claiming"
                ],
                answer: "had claimed"
            },
            {
                question: "He______________when the door bell rang",
                options: [
                    "mopped", "had mopped", "was mopping"
                ],
                answer: "was mopping"
            },
            {
                question: "The people at the beach______________themselves when the tsunami was approaching",
                options: [
                    "enjoyed", "had enjoyed", "were enjoying"
                ],
                answer: "were enjoying"
            },
            {
                question: "The writer said that the inspiration for her newest novel______________from a particular movie",
                options: [
                    "came", "had come", "was coming"
                ],
                answer:"had come" 
            },
            {
                question: "David's friends______________this morning once they learnt about the tsunami in his home town",
                options: [
                    "contacted", "had contacted", "were contacting"
                ],
                answer: "contacted"
            },
            {
                question: "Air pollution worsened and smug______________over the sky last night",
                options: [
                    "hung", "had hung", "was hanging"
                ],
                answer: "hung"
            },
            {
                question: "The trapped workers in the factory______________by the time the fire brigade came",
                options: [
                    "got", "had gotten", "was getting"
                ],
                answer: "had gotten"
            },
        ]
        
        this.questions = this.shuffle(this.questions);
    },
    methods: {
        startGame () {
            this.gameStarted = true;
            this.introduction();
        },
        introduction () {
            document.querySelector('#introAudio').play();
            document.querySelector('#introAudio').addEventListener('ended', () => {
                this.displayIntro = false;
                this.instruction ();
                
            });
            this.displayIntro = true;
        },
        instruction () {
            this.displayInstruction = true;
            document.querySelector('#instructionAudio').play();
            document.querySelector('#instructionAudio').addEventListener('ended', () => {
                this.displayInstruction = false;
                this.startTimer();
                document.querySelector('#app').addEventListener('mousemove', this.moveListener);
            });
            this.dissipateImages();
        },
        moveListener (event) {
            let cursor = document.querySelector('#myCursor');
            cursor.style.display = "block";
            cursor.style.top = `${event.clientY - 65}px`;
            cursor.style.left = `${event.clientX - 115}px`;
        },
        startTimer () {
            this.isTimerRunning = true;
            milliSecond = 99;
            let interval = setInterval(() => {
                milliSecond--;
                
                if (milliSecond === 0) {
                    this.startSecond--;
                }
                
            }, 10);
            if (this.startSecond === 0) {
                clearInterval(interval);
                milliSecond = 0;
            }
        },
        shuffle (array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        changeCursor (image) {
            document.querySelector('#myCursor').style.backgroundImage = `url(img/bino@${image})`;
        },
        returnCursor () {
            document.querySelector('#myCursor').style.backgroundImage = `url(img/cursorbinocular.png)`;
        },
        dissipateImages () {
            let row = document.createElement('div');
            row.classList = "row"
            row.style.paddingTop="15%"
            this.animals.forEach(animal => {
                let elem = document.createElement('div');
                let space = document.createElement('div');
                space.classList= "col-2";
                space.style.height = "50px;"
                elem.classList = "col-2 animals";
                elem.style.zIndex = 2;
                elem.style.height = "70px";
                elem.style.cursor = "none";
                elem.style.marginTop = "20px";
                elem.style.marginLeft = "50px";
                elem.style.backgroundImage = animal.image;
                elem.addEventListener('mouseenter', () => {
                    this.changeCursor(animal.image);
                });
                elem.addEventListener('mouseleave', () => {
                    this.returnCursor();
                });
                elem.addEventListener('click',  () => {
                    this.selectAnimal(animal, event);
                })
                row.appendChild(elem);
                row.appendChild(space);
            });
            document.querySelector('#appContainer').appendChild(row);
        },
        selectAnimal (animal, evt) {
            document.querySelector('#app').removeEventListener('mousemove', this.moveListener);
            this.hasSelectedAnimal = true;
            document.querySelectorAll('.animals').forEach(elem => {
                elem.removeEventListener('mouseenter', () => {
                    this.changeCursor(animal.image);
                });
                elem.removeEventListener('mouseleave', () => {
                    this.returnCursor();
                });
            })
            // evt.target.style.backgroundImage = animal.image;
            this.selectedQuestion = this.questions[Math.floor(10 * Math.random())];
            this.selectedQuestion.index = this.index++;
            // animal.isFound = true;
        },
        answer (index, isCorrect) {
            this.hasAnswered = true;
            setTimeout(() => {
                document.querySelectorAll('.myCheck')[index].style.display ="block";
            }, 100);
            // console.log(check);
            if (!isCorrect) {
                setTimeout(() => {
                    document.querySelectorAll('.myCheck')[index].style.display = "none";
                }, 700);
            }
        }

    }
})