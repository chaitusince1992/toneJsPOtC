
var baseTone = [{note: 'C4',duration: '8n',time: '0'},{note: 'E4',duration: '8n',time: "0:2"}];
var melody1 = [{note: ['A3','A4'],duration: '4n',time: '0'},{note: ['B3','B4'],duration: '4n',time: "1:0"}];
var baseTone2 = [{note: 'D4',duration: '8n',time: '0'},{note: 'E4',duration: '8n',time: "0:2"}];
var melody2 = [{note: ['A2','A3','A4'],duration: '4n',time: '0'},{note: ['B2','B3','B4'],duration: '4n',time: "0:2"},{note: ['C3','C4','C5'],duration: '4n',time: '1:0'},{note: ['B2','B3','B4'],duration: '4n',time: "1:2"},{note: ['A2','A3','A4'],duration: '4n',time: '2:0'},{note: ['B2','B3','B4'],duration: '4n',time: "2:2"},{note: ['C3','C4','C5'],duration: '4n',time: '3:0'},{note: ['B2','B4'],duration: '4n',time: '4:2'}];
// var baseTone3 = [{note: 'E5',duration: '8n',time: '0'},{note: 'E5',duration: '8n',time: '2:0'}];
var baseTone3 = [
    
{note: 'E4',duration: '16n',time: '0'},{note: 'A4',duration: '16n',time: "0:0:2"},

{note: 'E4',duration: '16n',time: '0:0:4'},{note: 'A4',duration: '16n',time: "0:0:6"},

{note: 'E4',duration: '16n',time: '0:0:8'},{note: 'A4',duration: '16n',time: "0:0:10"},

{note: 'E4',duration: '16n',time: "0:0:12"},{note: 'A4',duration: '16n',time: "0:0:14"},

];

var baseTone4 = [
    
{note: 'A4',duration: '16n',time: "0:0:2"},

{note: 'A4',duration: '16n',time: "0:0:6"},

{note: 'A4',duration: '16n',time: "0:0:10"},

{note: 'A4',duration: '16n',time: "0:0:14"},

];
var baseTone5 = [
    
{note: 'A4',duration: '16n',time: "0:0:2"},

{note: 'A4',duration: '16n',time: "0:0:6"},

{note: 'A4',duration: '16n',time: "0:0:10"},

{note: 'A4',duration: '16n',time: "0:0:14"},

];

// piono
var synth = new Tone.PolySynth(4, Tone.Synth, {
	"volume" : -8,
	"oscillator" : {
			"partials" : [1, 2, 5],
    },
    "envelope": {
        attack: 0.05
    },
	"portamento" : 0.005
}).toMaster();

// var part = new Tone.Part(function(time, value){
//     //the value is an object which contains both the note and the duration
//     synth.triggerAttackRelease(value.note, value.duration, time);
// }, baseTone).start(0);
// var part2 = new Tone.Part(function(time, value){
//     //the value is an object which contains both the note and the duration
//     synth.triggerAttackRelease(value.note, value.duration, time);
// }, melody1).start('2:0');
// var part3 = new Tone.Part(function(time, value){
//     //the value is an object which contains both the note and the duration
//     synth.triggerAttackRelease(value.note, value.duration, time);
// }, baseTone2).start('4:0');
// var part4 = new Tone.Part(function(time, value){
//     //the value is an object which contains both the note and the duration
//     synth.triggerAttackRelease(value.note, value.duration, time);
// }, melody2).start('6:0');
var part5 = new Tone.Part(function(time, value){
    //the value is an object which contains both the note and the duration
    synth.triggerAttackRelease(value.note, value.duration, time);
}, baseTone3).start('0:0');
// }, baseTone3).start('12:0');
var part6 = new Tone.Part(function(time, value){
    //the value is an object which contains both the note and the duration
    synth.triggerAttackRelease(value.note, value.duration, time);
}, baseTone4).start('4:0');

// part.loop = 4;
// part3.loop = 8;
part5.loop = 4;
part6.loop = 4;
// part.loopEnd = '20:0';

Tone.Transport.start();


stop = function() {
	Tone.Transport.stop();
}