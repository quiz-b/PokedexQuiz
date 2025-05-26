var que='', ans='', dLen='', tg='', tt='', delimiter='/';
var env=[140, 3, !1, !1, -1];//初期値0.14秒、読ませ押し３文字、ポイント表示、効果音、読み上げ
var csvArray=[];
var qNo=0, cut=0;
var rep=0, rep2=0;
var qLen=0, stop=0;
var flg=!1, tLimit=0;
var d=document, f=d.f1;
var q=f.que, a=f.ans;
var cnv=d.getElementById('cv');
var ctx=cnv.getContext('2d');
var w=cnv.width, h=cnv.height, x=w/2, y=h/2;
var p=0, aa=0, rt=!1, an=Math.PI * 1.5, tp=Math.PI * 2;
var quizButtonState = 0; // 0: 初期, 1: 停止後, 2: 回答表示後
let totalScore = 0;  // 累積得点
let queFullTextLength = 0;  // 現在の問題文の全文の長さ

const ac = [
  '#E0E0FF',
  '#D8D6FA',
  '#D0CCF6',
  '#C8C2F1',
  '#C0B8EC',
  '#B8AEE8',
  '#B0A4E3',
  '#A89ADE',
  '#A090DA',
  '#9886D5',
  '#907CD0',
  '#8872CB',
  '#8068C7',
  '#786EC2',
  '#7074BD',
  '#687AB9',
  '#6070B4',
  '#5866AF',
  '#506CAA',
  '#6868A0',
  '#6868A0'  // 最も濃い指定色
];
var ar=['TABLE', 'TR', 'TH', 'TD', 'SELECT', 'OPTION', 'LABEL', 'INPUT'];
var synth = window.speechSynthesis;
var voices = [];
var e=$('dg')

if(d.addEventListener){
	//$('cl').addEventListener((navigator.pointerEnabled)?'pointerdown':'mousedown', fncClick, false);
	//d.addEventListener('keydown', fncEntry, false);
}else{
	d.attachEvent('onmousedown', fncClick);
	d.attachEvent('onkeydown', fncEntry);
}
d.body.style.backgroundImage = 'url(' + bgimage + ')';

function csv2Array(){
	var i=0, cells=[];
	var xhr = new XMLHttpRequest();
	xhr.abort();
	xhr.open('GET', quizfile, false); //true:非同期,false:同期
	xhr.overrideMimeType('text/html;charset=UTF-8');
	xhr.send(null);
	var lines = xhr.responseText.split('\n');
	for(i in lines){
		cells = lines[i].split('\t');
		cells.length > ansIdx && csvArray.push(cells);
	}
//	addSelect();
	if(synthChk() && synth){
		synth.onvoiceschanged = addSelect();
	}
	chg(f.in1, 0);
	chg(f.in2, 1);
	chg(f.l01, 2);
	chg(f.l02, 3);
	chg(f.in3, 4);
	putButton();
	e.parentNode.removeChild(e);
}
function disp(){
	if(env[0]===0){
		q.value = que;
//		fncSpeak(que);
		stop = 2;
		putButton();
	}else{
		q.value = que.slice(0, cut);
		rep = setTimeout(disp, env[0]);
		cut >= qLen && (stop = 2, putButton());
		++cut;
	}
}
function draw(p) {
	tt=tLimit.toFixed(1);
	aa=Math.floor(tt);

	ctx.clearRect(0, 0, w, h);

	ctx.beginPath();
	ctx.fillStyle = ac[aa+1];
	ctx.arc(x, y, 36, 0, tp, false);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.fillStyle = ac[aa];
	ctx.arc(x, y, 36, an, tp * p + an, false);
	ctx.fill();

	ctx.beginPath();
	ctx.font = "bold 48px 'Times New Roman'";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#994444";
	ctx.fillText(tt, x, y);
}
function cntDown(){
	p = (1 - tLimit % 1).toFixed(1);
	draw(p);
	tLimit -= .1;
	tLimit < 0?putButton():rep2 = setTimeout(cntDown, 100);
}
function fncClick(e){
	tg = e.target.tagName.toUpperCase();
	rt = !1;
	(tg === 'TEXTAREA')?rt = 0:ar.indexOf(tg) === -1 && fncEntry();
	d.onselectstart = function(){return rt};
}
function fncEntry(e){
	const tag = (e && e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
	if(tag === 'INPUT' || tag === 'TEXTAREA') return;

	stop == 2 && fncStop();
	putButton();
}
function insStr(s, idx, str){
	return s.slice(0, idx) + str + s.slice(idx);
}
function putButton(){
	const btn = document.getElementById('quizButton');

	switch(stop){
	case 0:
		btn.innerText = "問題文停止";
		document.getElementById("answerInput").value = "";
		document.getElementById("resultMsg").textContent = "";
		stop = 1;
		flg = !1, cut = 0, tLimit = 20;
		qNo = parseInt(Math.random() * pokemonList.length);
		que = dquotDel(pokemonList[qNo].description);
		ans = dquotDel(pokemonList[qNo].name + "\n\n" +"図鑑説明の世代：" + pokemonList[qNo].generation);
		/*qNo = parseInt(Math.random() * csvArray.length);
		que = dquotDel(csvArray[qNo][queIdx]);
		ans = dquotDel(csvArray[qNo][ansIdx]);*/
		//que.match(/？$|\?$/) || (que += '？');

		fncPlay('se1');
		fncSpeak(que);
		a.value = '';
		qLen = que.length;
		dLen = '' + qLen;
		$('len').innerHTML = '図鑑説明の長さ&nbsp;' + Array(5-dLen.length).join('&nbsp;') + dLen;
		draw(5.0);

		disp();
		break;
	case 1:
		if(!flg){
			qLen = cut + env[1] - 1;
			if(env[2]){
				que = insStr(que, cut - 1, delimiter); ++qLen;
				env[1] != 0 && (que = insStr(que, qLen, delimiter), ++qLen);
			}
			fncPlay('se2');
			flg = !0;
		}
		break;
	case 2:
		btn.innerText = "回答する";
		que.length==cut && fncWait();
		fncStop();
		clearTimeout(rep);
		cntDown();
		fncPlay('se5');
		stop = 3;
		break;
	case 3:
		const displayedLength = document.getElementById("que").value.length;
		btn.innerText = "次の問題へ";
		clearTimeout(rep2);
		fncPStop('se5');
		fncPlay(tLimit < 0?'se3':'se4');
		q.value = que;
		a.value = ans;
		fncSpeak(ans);
				
		const userAnswer = document.getElementById("answerInput").value.trim();
		const correctAnswer = ans.split('\n')[0].trim(); // 「名前」だけ取り出して比較

		if (toHiragana(userAnswer) === toHiragana(correctAnswer)) {
			// 表示された文字数（d1 のテキストエリアの値）
    		//const displayedLength = document.getElementById("que").value.length;

		    // 問題文の長さ（事前に que.length などで取得済み？）
    		const fullLength = que.length;  // ← この変数は後述します

		    const score = fullLength/displayedLength*100;
		    
		    console.log(displayedLength);
		    console.log(fullLength);
		    console.log(score);
		    
		    
    		totalScore += score;

    		// スコア表示を更新
    		document.getElementById("scoreDisplay").textContent = `スコア: ${totalScore.toFixed(1)}`;
			document.getElementById("resultMsg").textContent = "正解！" + fullLength +" 文字中" + displayedLength + " 文字目で正解 " + score.toFixed(1) +" 点獲得";
			
		} else {
			document.getElementById("resultMsg").textContent = "不正解！";
		}
		
		stop = 0;

		break;
	}
}
function fncWait(){
	synth && env[0] != 0 && env[4] != -1 && synth.speaking && fncWait();
}
function dquotDel(s){
	return s.replace(/^"(.*)"$/,'$1');
}
function bgChange(c){
	q.style.backgroundColor = c;
	a.style.backgroundColor = c;
}
function chg(o, Idx){
	env[Idx] = (o.type=='checkbox')?o.checked:parseInt(o.options[o.selectedIndex].value);
}
function $(id){
	return d.getElementById(id);
}
function fncPlay(id){
}
function fncPStop(id){
}
function fncSpeak(s){
	if(synth && env[0] != 0 && env[4] != -1){
		let ssu = new SpeechSynthesisUtterance();
		let sp = 1.0 + (160 - env[0]) / 100 + (200 - env[0]) / 2000;

		ssu.voice = voices[env[4]];	//音声の設定
		ssu.text  = s;			//読む内容
		ssu.rate  = sp;			//速度    0.1-10
		ssu.pitch = 1.0;		//ピッチ  0.0-2.0
		ssu.lang  = "ja-JP";	//日本語に設定
		ssu.volume = 1.0;		//音量

		synth.cancel();		//停止
		synth.speak(ssu);	//喋れ
	}
}
function fncStop(){
	synthChk() && synth.cancel();
}
function addSelect(){
	if(synthChk()){
		for(voices = synth.getVoices(), i = 0; i < voices.length; i++){
			if(voices[i].lang=="ja-JP"){
				let op = d.createElement('option');
				op.value = i;
				op.text  = voices[i].name;
				op.classList.add((f.in3.length % 2)? 'ev': 'od');
				f.in3.appendChild(op);
			}
		}
	}
}
function synthChk(){
	return !(typeof synth === 'undefined');
}

function toHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}
