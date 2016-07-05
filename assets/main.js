var noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
var numOctaves = 7;
var notesPerOctave = 12;
var noteHeight = 12;
var totalNotes = numOctaves * notesPerOctave;

var h = noteHeight * (numOctaves * notesPerOctave);
var w = 2000;

document.addEventListener('DOMContentLoaded', function(event) {
    var els = document.querySelectorAll('#scale, #grid');
    els.forEach(function(el){
        el.style.height = h;
    });
});

var scale = function( p ) {

    p.setup = function() {

        p.createCanvas(100, h);
        for (var i = 0; i < totalNotes; i++) {
            var ww = 0;
            if (noteScale[i % notesPerOctave] == 0) {
                p.fill(255);
                ww = p.width;
            } else {
                p.fill(60);
                ww = p.width - 30;
            }
            p.stroke(220);
            p.rect(0, (h-noteHeight) - (noteHeight * i), ww, noteHeight);
        }

        var octNum = 0;
        var octInt = 0;

        for (var i = 0; i < totalNotes; i++) {            
            if ( i % notesPerOctave === 0) {
                octInt = i;
                p.fill(0);
                p.noStroke();
                p.textSize(9);
                console.log(i);
                p.text('C' + octNum, 77, p.int(h-(noteHeight * octInt) - (noteHeight)/5));    
                octNum++;
            }
        }

    };

    p.draw = function() {};
};


var grid = function(p) {
    
    var gridBarWidth = null;
    
    class Note {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        update() {

        }
        display() {
            p.fill('red');
            p.rect(this.x, this.y, this.w, this.h);
        }
    }

    p.setup = function() {
        p.createCanvas(1600, h);
        gridBarWidth = p.width / 64;

        for (var i = 0; i < totalNotes; i++) {
            var n = i % 2;
            (noteScale[i % notesPerOctave] == 0) ? p.fill(255) : p.fill(240);  
            p.stroke(240);
            p.rect(0, noteHeight * i, w, noteHeight);
           
        }
        
        for (var i = 0; i < 64; i++) {
            p.stroke(220);
            p.line(i*gridBarWidth, 0, i*gridBarWidth, p.height);
        }

    };

    p.draw = function() {};
};

// create contexts
var scaleContainer = new p5(scale, 'scale');
var gridContainer = new p5(grid, 'grid');
