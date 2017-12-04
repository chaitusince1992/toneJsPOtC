/* playing single note */
function playIt(){
    var osc = new Tone.OmniOscillator().toMaster();
    osc.frequency.value = 'C4';
    osc.volume.value = 2;
    Tone.Transport.bpm.value = 120;   
    var duration = '4n';
    osc.start().stop("+"+duration);
 }

// play major scale
var majorscale = function() {
    var Cmajor = ['C4','D4','E4','F4','G4','A4','B4','C5'];
    var Ebmajor = ['Eb4','F4','G4','Ab4','Bb4','C5','D5','Eb5'];
    
}

var playCMajorScale = function(){
    var synth = new Tone.Synth().toMaster();
    var myScale = ['C4','D4','E4','F4','G4','A4','B4','C5'];
    // var patternMenu = document.getElementById("melodicPattern");
    // var patternName = patternMenu.options[patternMenu.selectedIndex].value;
    var patternName = 'random'; //up, down, random and etc...
 
    var pattern = new Tone.Pattern(function(time, note){
    //the order of the notes passed in depends on the pattern
    synth.triggerAttackRelease(note, "4n", time);
    }, myScale, patternName).start(0);    
 
    // var tempo = document.myForm.tempo.value;
    var tempo = 120;
    Tone.Transport.bpm.value = tempo   
    synth.volume.value = 2;
    Tone.Transport.start("+0.1");
 }

 var partExample = function() {
    var synth = new Tone.Synth().toMaster();
    //use an array of objects as long as the object has a "time" attribute
    var part = new Tone.Part(function(time, value){
        //the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, "2n", time, value.velocity);
    }, [{"time" : 0, "note" : "C3", "duration": '2n'}, 
        {"time" : "0:2", "note" : "C4", "duration": '2n'}
    ]).start(0);
    Tone.Transport.start();
 }

 var marioPitches = function() {
    var mariaPitches = ["Eb4","A4","Bb4","Eb4","A4","Bb4","C5","A4","Bb4","C5","A4","Bb4","Bb4","A4","G4","F4","Eb4","F4","Bb4","Ab4","G4","F4","Eb4","F4","Eb4","G4"];
    
    var mariaDurations = ["8n","8n","2n + 4n","8n","4t","4t","4t","4t","4t","4t","8n","2n + 4n","8n","8n","8n","8n","8n","4n + 8n","8n","8n","8n","8n","8n","4n","4n","2n"];
    
    // processDurationNotation() is called inside mergeDurationsAndPitch()
    var myMelody = Rhythm.mergeDurationsAndPitch(mariaDurations, mariaPitches); 
    
    var synth = new Tone.Synth().toMaster();

    //use an array of objects as long as the object has a "time" attribute
    var part = new Tone.Part(function(time, value){
        //the value is an object which contains both the note and the duration
        synth.triggerAttackRelease(value.note, value.duration, time);
    }, myMelody).start(0);
    Tone.Transport.start();
 }



 var familyOfTriads = [[0,4,7],[0,3,7],[0,3,6],[0,4,8]];
 function makeChordArray(root, chordFormula, timeInterval) {
    var indexMIDI
    var aChord = [];
    var timeAndChord = [];
    var toneTime = 0;
    var chordArray = [];
    for(let i=0; i<chordFormula.length; i++) {
        for(let j=0; j<chordFormula[i].length; j++) {
            // add the root to each chord tone
            indexMIDI = chordFormula[i][j] + Number(root);
            // tranlate to a pitch/octave name
            aChord.push(MIDI_NUM_NAMES[indexMIDI]);
        }
        j = 0;
        // create add time and chord together
        timeAndChord.push(toneTime.toNotation());
        timeAndChord.push(aChord);
        chordArray.push(timeAndChord);
        // now calc the time value for next time
        toneTime = toneTime.add(timeInterval);
        // clear the arrays;
        aChord = [];
        timeAndChord = [];
    }
    return chordArray;
}

//	PIANO
var piano = new Tone.PolySynth(4, Tone.Synth, {
    "volume" : -8,
    "oscillator" : {
        "partials" : [1, 2, 5],
    },
    "portamento" : 0.005
}).toMaster()


function playFamilyOfTriads() {
    // var rootMenu = document.getElementById("root");
    // var root = rootMenu.options[rootMenu.selectedIndex].value;
    root = 60;
    // this line is hardwired to the familyOfTriads global array, 
    // that will need to change to make this a more useful function
    var myChords = makeChordArray(root, familyOfTriads, '2n');

	var chordPart = new Tone.Part(function(time, chord){
		piano.triggerAttackRelease(chord, "2n", time);
	}, myChords ).start(0);

	chordPart.loop = true;
	chordPart.loopStart = "0:0";
	chordPart.loopEnd = "2:0";

	var tempo = document.myForm.tempo.value;
	Tone.Transport.bpm.value = tempo;   
	Tone.Transport.start("+0.1");
}


var notes = ["A3","B3","C4","D4",  "E4","D4","C4","B3",  "A3","B3","C4","D4",  "E4","D4","C4","B3",
"A3","B3","C4","D4",  "E4","D4","C4","B3",  "A3","B3","C4","D4",  "E4","D4","C4","B3"];

var durs = ["4n","4n","4n","4n",  "4n","4n","4n","4n",  "4n","4n","4n","4n",  "4n","4n","4n","4n",
"16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr",
"16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr",
"16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr",
"16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr","16n","16nr+8nr"];

var vel = [0.1,0.2,0.3,0.4,  0.5,0.6,0.7,0.9,  1.0,0.9,0.8,0.7,  0.6,0.5,0.4,0.3,
0.1,0.2,0.3,0.4,  0.5,0.6,0.8,1.0,  1.0,0.1,1.0,0.1,  0.1,1.0,0.1,1.0];


function volumeDemo() {
	var longToneNotes = ["A3","E4","A4","C#5","C5"];
	var longToneDurs = ["1m","1m","1m + 2n + 4n","8n","2*1m + 8n"]
	var longToneVels = [0.7,0.8,0.8,0.6,0.9];

	var longTones = Rhythm.mergeDurationVelocityAndPitch(longToneDurs, longToneNotes, longToneVels);
	console.log(longTones);

	// bpm.value needs to be set before Tone.Part is created so that
	// the definition of '1m' syncs with linearRampToValueAtTime()
	Tone.Transport.bpm.value = 60;   

	var synth = new Tone.Synth().toMaster();
	var volumePart1 = new Tone.Part(function(time, value){
		synth.triggerAttackRelease(value.note, value.duration, time, value.velocity)
	}, longTones ).start(0);
	// create volume crescendos
	synth.volume.setValueAtTime(-30, "0");
	synth.volume.linearRampToValueAtTime(0, "+1m");    
	synth.volume.linearRampToValueAtTime(-30, "+1m + 32n");    
	synth.volume.linearRampToValueAtTime(0, "+2*1m");    
	synth.volume.linearRampToValueAtTime(-30, "+2*1m + 32n");    
	synth.volume.linearRampToValueAtTime(0, "+3*1m");    
	// fade away
	synth.volume.linearRampToValueAtTime(-5, "+5*1m");    
	synth.volume.linearRampToValueAtTime(-Infinity, "+6*1m"); 

	Tone.Transport.start("+0.1");
}




























