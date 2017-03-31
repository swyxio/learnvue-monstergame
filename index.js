new Vue({
        el: '#app',
        data: {
            you: 100, // your health
            mon: 100, // monster health
            gameOn: false, // start with game off
            gameLog: []
        },
        watch: {
            mon: function(x) {
                if (x <= 0) {
                    var txt;
                    var r = confirm("You won! Start new game?");
                    if (r == true) {
                        this.newGame();
                        this.startGame();
                    }
                }
            },
            you: function(x) {
                if (x <= 0) {
                    var txt;
                    var r = confirm("You lost! Start new game?");
                    if (r == true) {
                        this.newGame();
                        this.startGame();
                    }
                }
            }
        },
        methods: {
            randInt: function(a,b){
                return Math.floor(Math.random() * (b-a + 1)) + a
            },
            newGame: function() {
                this.gameOn=false;
                this.gameLog=[];
            },
            startGame: function() {
                this.gameOn=true;
                this.you=100;
                this.mon=100;
            },
            monattack: function() {
                // mon attack
                const attackHP2 = this.randInt(5,10)
                this.you -= attackHP2; 
                this.gameLog.unshift({which:"monster-turn",msg: "Monster attacked you for " + attackHP2});
            },
            attack: function(min, max) {
                // you attack
                const attackHP = this.randInt(min,max)
                this.mon -= attackHP;
                this.gameLog.unshift({which:"player-turn", msg:"You attacked monster for " + attackHP});
                this.monattack();
            },
            heal: function() {
                // you heal
                const healHP = 20
                this.you += healHP;
                this.gameLog.unshift({which:"player-turn", msg:"You healed for " + healHP});
                this.monattack();
            },
        }
    });