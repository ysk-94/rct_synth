class Audio {

	constructor() {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.ctx = new AudioContext();
		this.ctx.createGain = this.ctx.createGain || this.ctx.createGainNode;

		this.note = {
			'C': 261.6,
			'C#': 277.2,
			'D': 293.7,
			'D#': 311.1,
			'E': 329.6,
			'F': 349.2,
			'F#': 370.0,
			'G': 392.0,
			'G#': 415.3,
			'A': 440.0,
			'A#': 466.2,
			'B': 493.9,
			'C2': 523.3,
		};

		this.oscs = [];
	}


	startNote(noteId) {
		if (!noteId) return;

		var osc = this.ctx.createOscillator();
		osc.frequency.value = this.note[noteId];

		var gain = this.ctx.createGain();
		gain.gain.value = 0.3;

		osc.connect(gain);
		gain.connect(this.ctx.destination);
		osc.start();

		this.oscs.push({
			note: noteId,
			osc: osc
		});
	}

	stopNote(noteId) {
		this.oscs.forEach((osc, i, oscs) => {
			if (osc.note === noteId) {
				osc.osc.stop();
				oscs.splice(i, 1);
			}
		});
	}
}

export default Audio;
