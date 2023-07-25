<script>
// @ts-nocheck

    let recording = false;
    let stream;
    let mediaRecorder;
    let audioChunks = [];
    let recordedAudioUrl;
  
    async function startRecording() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
  
        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });
  
        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          recordedAudioUrl = URL.createObjectURL(audioBlob);
        });
  
        mediaRecorder.start();
        recording = true;
      } catch (error) {
        console.log(error);
      }
    }
  
    function stopRecording() {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
      recording = false;
    }
  
    function playRecordedAudio() {
      const audioElement = new Audio(recordedAudioUrl);
      audioElement.play();
    }
  </script>
  
  <button on:click="{recording ? stopRecording : startRecording}" class="btn btn-sm rounded-full  hover:bg-white hover:bg-opacity-20 {recording ? 'bg-red-600' : 'bg-black bg-opacity-20'}">
    <img src={recording ? '/mic_on.png' : '/mic_off.png'} alt="mic" class="w-3"/>
    <!-- {recording ? 'Stop Recording' : ''} -->
  </button>
  
  <button on:click="{playRecordedAudio}" disabled="{!recordedAudioUrl}" class="btn btn-sm rounded-full  hover:bg-white hover:bg-opacity-20 bg-black bg-opacity-20 {!recordedAudioUrl ? 'disabled' : ''}">
    <img src="/play.png" alt="play" class="w-3"/>
  </button>