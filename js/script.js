const audio_list = [
    '03.Aayega_Maza.MP3',
    '09.Nagordola-(BDmusic24.net).mp3',
    'Chicken_Tanduri_by_Action.mp3',
    'iPhone_Ringtone_Trap_Remix.mp3',
    'Na_na_ta.mp3',
    'Nanna.mp3'
]

let btn_start = document.querySelector('#btn_start');
// let btn_stop = document.querySelector('#btn_stop');
let btn_prev = document.querySelector('#btn_prev');
let btn_next = document.querySelector('#btn_next');
let audio_name = document.querySelector('#audio_name');
let audio_time = document.querySelector('#audio_time');
let audio_end = document.querySelector('#audio_end');
let audio_index = document.querySelector('#audio_index');

let myAudio = new Audio();
let audioIndex = 0;

let isStart = false;
btn_start.onclick = function() {
    isStart = !isStart;
    if(isStart){
        this.innerHTML = 'Stop'
    } else {
        this.innerHTML = 'Start'
    }
    audioPlayFunc(audioIndex, false) // init
}

function audioPlayFunc(index, isDefault=true){
    myAudio.src = '../media/'+audio_list[index];
    audio_name.innerHTML = String(audio_list[index]).replaceAll('_', ' ');
    audio_index.innerHTML = audioIndex+1+'.';
    if(!isDefault && isStart){
        myAudio.play();
        
        let audio_update = setInterval(()=> updateAudioTimer(), 1000);
    } else {
        myAudio.pause()
    }
}

function updateAudioTimer(){
    //console.log(myAudio.currentTime)
    let get_time = Math.floor(myAudio.currentTime);

    let ss = get_time < 10 ? '0' + get_time : get_time % 60;
    let mm = get_time > 59 ? Math.floor(get_time/60) :'00';

    audio_time.innerHTML = `${mm} : ${ss}`;

    let get_dur = myAudio.duration;
    let dur_ss = get_dur < 10 ? '0' + get_dur : get_dur % 60;
    let dur_mm = get_dur > 59 ? Math.floor(get_dur/60) : '00';

    audio_end.innerHTML = `${dur_mm} : ${Math.floor(dur_ss)}`
}


function audioEndTimer(){
    console.log(myAudio.duration)
    audio_end.innerHTML = myAudio.duration;
}



audioPlayFunc(audioIndex, true)

// btn_stop.onclick = ()=> {
//     myAudio.pause()
// }

btn_prev.onclick = ()=> {
    audioIndex--;
    audioPlayFunc(audioIndex, false)
}
btn_next.onclick = ()=> {
    audioIndex++;
    audioPlayFunc(audioIndex, false)
}
btn_range.oninput = function() {
    let get_value = this.value;
    myAudio.volume = get_value / 100;
    volume_parcent.innerHTML = get_value + '%'
}