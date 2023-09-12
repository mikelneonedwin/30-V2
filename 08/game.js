const { createApp } = Vue;

createApp({
    data: () => ({
        state: '',
        step: 1,
        choice: '',
        c: '',
        options: {
            paper: "./images/icon-paper.svg",
            scissors: "./images/icon-scissors.svg",
            rock:  "./images/icon-rock.svg",
        },
        score: (() => {
            if(localStorage.getItem("score")) return localStorage.getItem("score");
            localStorage.setItem("score", 0);
            return 0;
        })()
    }),
    methods: {
        pick({target}){
            this.choice = Object.entries(this.options).find(([key, val]) => val == target.getAttribute("src"))[0];
            this.step = 2;
            setTimeout(() => {
                const opt = Object.keys(this.options).filter(a => a != this.choice);
                this.c = opt[Math.floor(Math.random() * opt.length)];
                setTimeout(() => {
                    this.step = 3;
                    const wins = {
                        scissors: "paper",
                        rock: "scissors",
                        paper: "rock"
                    }
                    if(wins[this.c] == this.choice) {
                        this.state = "YOU LOSE",
                        this.score--;
                    } else if(wins[this.choice] == this.c) {
                        this.state = "YOU WIN",
                        this.score++;
                    } else this.state = "IT'S A TIE";
                    localStorage.setItem("score", this.score);
                }, 1500)
            }, 1500)
        },
        again(){
            this.step = 1;
            this.choice = '';
            this.c = '';
            this.state = '';
        }
    },
    computed: {
        choiceHTML(){
            return this.options[this.choice];
        },
        house(){
            return this.options[this.c];
        }
    }
}).mount('div');