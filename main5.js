const socket = new WebSocket("ws://" + location.hostname + ":8080/");
socket.onopen = function(){console.log("connection was established");};  //接続が確立した時に呼ばれる
document.getElementById('LiveImg').innerHTML = "<img src=\"http://" + location.hostname + ":8081/?action=stream\" />";

$('#motor_on').on('click', function(e){
	socket.send('on');
	$('#motor_on').attr('class','btn btn-danger');
	$('#motor_off').attr('class','btn btn-default');
});

$('#motor_off').on('click', function(e){
	socket.send('off');
	$('#motor_on').attr('class','btn btn-default');
	$('#motor_off').attr('class','btn btn-primary');
});

//音声認識
var recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
$('#voice_on').on('click', function(e){
	$('#voice_on').attr('class','btn btn-danger');
	$('#voice_off').attr('class','btn btn-default');
});

$('#voice_off').on('click', function(e){
	$('#voice_on').attr('class','btn btn-default');
	$('#voice_off').attr('class','btn btn-primary');
});
//話し声の認識中
recognition.onsoundstart = function(){
    $("#state").text("LED(音声認識認識中)");
};
//マッチする認識が無い
recognition.onnomatch = function(){
    $("#recognizedText").text("もう一度試してください");
};
//エラー
recognition.onerror= function(){
    $("#recognizedText").text("エラー");
};
//話し声の認識終了
recognition.onsoundend = function(){
    $("#state").text("LED(音声認識停止中)");
	$('#voice_on').attr('class','btn btn-default');
	$('#voice_off').attr('class','btn btn-primary');
};
//中間結果の表示オン
recognition.interimResults = true;

recognition.onresult = function(event){
    var results = event.results;
    for (var i = event.resultIndex; i<results.length; i++){
        //認識の最終結果
        if(results[i].isFinal){
            $("#recognizedText").text(results[i][0].transcript);
			socket.send(results[i][0].transcript);
        }
        //認識の中間結果
        else{
            $("#recognizedText").text(results[i][0].transcript);
        }
    }
};
