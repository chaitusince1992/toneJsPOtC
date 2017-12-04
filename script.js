Tone.Transport.bpm.value = 120;

// var notes = ['E4','C4','E4','C4','E4','C4','E4','C4','E4','C4','E4','C4',['E4','A4','A3'],'C4','E4','C4','E4','C4',['E4','B4','B3'],'D4','E4','D4','E4','D4','E4','D4','E4','D4','E4','D4',['E4','A4','A3','A2'],'C4',['E4','B4','B3','B2'],'D4',['C3','C4','C5','E4'],'D4',['E4','B2','B3','B4'],'D4',['E4','A2','A3','A4'],'D4',['E4','B2','B3','B4'],'D4',['E4','C3','C4','C5'],'D4','E4','D4','E4','D4',['E4','B2','B4'],'D4','E4','D4','E4','D4',['F1','F2','C2','A3','A4','E4']];
var notes1 = ['E4','C4','E4','C4','E4','C4','E4','C4','E4','C4','E4','C4'];
var notes2 = [['A4','A3'],['B4','B3'],['A4','A3'],['B4','B3'],['A4','A3'],['B4','B3']];
// var notes = ['C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3','C3', 'E3'];
var current_note = 0;

// http://tonejs.org/docs/#DuoSynth
// var synth = new Tone.PolySynth(10,Tone.Synth()).toMaster();
var synth = new Tone.PolySynth(4, Tone.Synth, {
	"volume" : -8,
	"oscillator" : {
			"partials" : [1, 2, 5],
	},
	"portamento" : 0.005
}).toMaster();
var synth2 = new Tone.PolySynth(4, Tone.Synth, {
	"volume" : -8,
	"oscillator" : {
			"partials" : [1, 2, 5],
	},
	"portamento" : 0.005
}).toMaster();
// var gain  = new Tone.Gain(1);
// synth.connect(gain);
// gain.toMaster();
// synth.toMaster();

// synth.triggerAttackRelease(['A1','B1'],'16n');

// synth.voice0.oscillator.type = 'triangle';
// synth.voice1.oscillator.type = 'triangle';


Tone.Transport.scheduleRepeat(function(time) {
  var note1 = notes1[current_note % notes1.length];
  synth.triggerAttackRelease(note1, '4n', time);
  var note2 = notes2[current_note % notes2.length];
  synth2.triggerAttackRelease(note2, '4n', time);
//   ampEnv.triggerAttackRelease("8t",time)
	// if(typeof note != 'object') {
	// 	var osc = new Tone.Oscillator(Tone.Frequency(note).toFrequency()).connect(ampEnv).start();
	// } else {
	// 	note.forEach(function(nd) {
	// 		// var osc = new Tone.Oscillator(Tone.Frequency(nd).toFrequency()).connect(ampEnv).start();			
	// 	})
	// }
	// ampEnv.triggerAttackRelease("8t", "+"+time)
  current_note++;
  if(current_note == notes1.length-1) {
	Tone.Transport.stop();
  }
}, '8n');

// Tone.Transport.loop = false;

// start the repeat
Tone.Transport.start();
// Tone.Transport.pause();
stop = function() {
	Tone.Transport.stop();
}