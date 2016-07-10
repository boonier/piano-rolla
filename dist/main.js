'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// var noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

var noteScale = ['C', 'C#', 'D', 'E#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var numOctaves = 7;
var notesPerOctave = 12;
var noteHeight = 16;
var totalNotes = numOctaves * notesPerOctave;

var h = noteHeight * (numOctaves * notesPerOctave);
var w = 2000;

////// DOM setup stuff
document.addEventListener('DOMContentLoaded', function (event) {
    var els = document.querySelectorAll('#scale, #grid');
    els.forEach(function (el) {
        el.style.height = h;
    });
});

//  Websocket stuff
// var oscPort = new osc.WebSocketPort({
//     url: "ws://localhost:8081" // URL to your Web Socket server.
// });
// oscPort.open();

///////// Processing stuff
var scale = function scale(p) {

    p.setup = function () {

        p.createCanvas(100, h);

        for (var i = 0; i < totalNotes; i++) {
            var ww = p.width;
            if (noteScale[i % notesPerOctave].indexOf('#') > 0) {
                p.fill(60);
            } else {
                p.fill(255);
            }

            p.stroke(220);
            p.rect(0, h - noteHeight - noteHeight * i, ww, noteHeight);
        }

        p.noStroke();
        p.textSize(9);
        var octNum = 0;
        var octInt = 0;

        for (var i = 0; i < numOctaves; i++) {

            for (var j = 0; j < notesPerOctave; j++) {
                var note = noteScale[j];
                note.indexOf('#') === -1 ? p.fill(0) : p.fill(255); //color
                p.text(note + octNum, 77, p.text(note + octNum, 77, p.int(h - noteHeight * j - noteHeight / 5 - notesPerOctave * noteHeight * octNum) // pos - correction - offset
                ));
            }
            octNum++;
        }
    };

    p.draw = function () {};
};

var grid = function grid(p) {

    var gridBarWidth = null;

    var Note = function () {
        function Note(x, y, w, h) {
            _classCallCheck(this, Note);

            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        _createClass(Note, [{
            key: 'update',
            value: function update() {}
        }, {
            key: 'display',
            value: function display() {
                p.fill('red');
                p.rect(this.x, this.y, this.w, this.h);
            }
        }]);

        return Note;
    }();

    p.setup = function () {
        p.createCanvas(1600, h);
        gridBarWidth = p.width / 64;

        for (var i = 0; i < totalNotes; i++) {
            var n = i % 2;
            noteScale[i % notesPerOctave] == 0 ? p.fill(255) : p.fill(240);
            p.stroke(240);
            p.rect(0, noteHeight * i, w, noteHeight);
        }

        for (var i = 0; i < 64; i++) {
            p.stroke(220);
            p.line(i * gridBarWidth, 0, i * gridBarWidth, p.height);
        }
    };

    p.draw = function () {};
};

// create contexts
var scaleContainer = new p5(scale, 'scale');
var gridContainer = new p5(grid, 'grid');