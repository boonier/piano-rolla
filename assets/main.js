
var h = 1000;
var w = 2000;

var noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1];
var numOctaves = 7;
var notesPerOctave = 12;
var noteHeight = 12;
var totalNotes = numOctaves * noteHeight;

// console.log(totalNotes)

var scale = function( p ) {

    p.setup = function() {
        p.createCanvas(100, h);
        // p.x = 0;
        // p.y = 0;

        for (var i = 0; i < totalNotes; i++) {

            (noteScale[i % noteScale]) ? p.fill(255) : p.fill(20);
            p.rect(0, noteHeight * i, p.width, noteHeight);
        }

    };

    p.draw = function() {
        // p.background(248);
        // p.fill(100);
        // p.noStroke();
        // p.rect(p.x, p.y, 50, 50);
        // p.x += 0.3; p.y += 0.3;

        // if(p.x > p.width - 50) {
        //     p.x = 0;
        //     p.y = 0;
        // }
            

    };
};


var grid = function(p) {

    p.setup = function() {
        p.createCanvas(1600, h);
        p.x = 0;
        p.y = 0;

        for (var i = 0; i < totalNotes; i++) {
            var n = i % 2;
            (n == 0) ? p.fill(248) : p.fill(255);  
            p.stroke(240);
            p.rect(0, noteHeight * i, w, noteHeight);
            p.fill(0);
            p.textSize(9);
            p.text(i, 0, noteHeight * i);
        }
        
        var gridBarWidth = p.width / 64;
        for (var i = 0; i < 64; i++) {
            p.stroke(220);
            p.line(i*64, 0, i*64, p.height);
        }
        


    };
    p.draw = function() {
        // p.background(180);
        /*p.noStroke();
        p.fill(255);
        p.ellipse(p.x, p.y, 20, 20);
        p.x += 0.1;
        p.y += 0.1;
        */

    };
};

// create contexts
var scaleContainer = new p5(scale, 'scale');
var gridContainer = new p5(grid, 'grid');