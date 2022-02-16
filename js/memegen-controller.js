'use strict';

var gCanvas;
var gCtx;
var gFirstLoad;
var gIsLocalImg;
var gLocalImg;
var gNoFocus;
var gDragOn;
var gFocustxt;
var gFocusSticker;
var gCurrPosX;
var gCurrPosY;

function renderCanvas() {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d');
    if (gFirstLoad) resizeCanvas();
    if (gIsLocalImg) drawLocalImg(gLocalImg);
    else drawImg();
    if (!gNoFocus) drawFocusRect();
    else gNoFocus = false;
    renderText();
    drawStickers();
}

function resizeCanvas() {
    var imgId = getSelectedImg();
    var elImg = document.querySelector(`#img-num-${imgId}`);
    var ratio = elImg.width / elImg.height;
        gCanvas.width = window.innerWidth - 15;
        gCanvas.height = (gCanvas.width / ratio);
        document.querySelector('.meme-control').style.width = `"${window.innerWidth}px"`;
        gCanvas.width = 500;
        gCanvas.height = (gCanvas.width / ratio);
    changePosTexts(gCanvas.width, gCanvas.height);
    gFirstLoad = false;
}

function drawLocalImg() {
    gCtx.drawImage(gLocalImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
    var imgId = getSelectedImg();
    var elImg = document.querySelector(`#img-num-${imgId}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function renderText() {
    var meme = getMeme();
    var lines = meme.lines;
    if (lines.length === 0) return;
    lines.forEach(line => drawText(line))
    var selectedLine = meme.lines[meme.selectedLineIdx];
    document.querySelector('.control-txt-input').value = selectedLine.txt;
}

function drawStickers() {
    var meme = getMeme();
    var stickers = meme.stickers;
    if (stickers.length === 0) return;
    else stickers.forEach(sticker => {
        var elSticker = document.querySelector(`#sticker-num-${sticker.id}`);
        gCtx.drawImage(elSticker, sticker.positionX, sticker.positionY, sticker.width, sticker.height);
    })
}

function drawFocusRect() {
    var meme = getMeme();
    if (gFocustxt) {
        if (meme.lines.length === 0) return;
        var line = meme.lines[meme.selectedLineIdx];
        var posX = line.positionX;
        var posY = line.positionY;
        gCtx.beginPath();
        gCtx.rect(posX - 160, posY - 40, 320, 50);
        gCtx.setLineDash([4, 4]);
        gCtx.strokeStyle = 'black';
        gCtx.stroke();
    }
    if (gFocusSticker) {
        var sticker = meme.stickers[meme.selectedStickerIdx];
        var posX = sticker.positionX;
        var posY = sticker.positionY;
        gCtx.beginPath();
        gCtx.rect(posX - 10, posY - 10, sticker.width + 20, sticker.height + 20);
        gCtx.setLineDash([4, 4]);
        gCtx.strokeStyle = 'black';
        gCtx.stroke();
    }
}

function drawText(line) {
    gCtx.setLineDash([]);
    gCtx.lineWidth = '1';
    gCtx.strokeStyle = line.OutlineColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.positionX, line.positionY);
    gCtx.strokeText(line.txt, line.positionX, line.positionY);
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onAddLine() {
    addLine();
    gFocustxt = true;
    gFocusSticker = false;
    renderCanvas();
}

function onChangeText(txt) {
    editMeme('txt', txt);
    gFocustxt = true;
    gFocusSticker = false;
    renderCanvas();
}

function onSwitchLines() {
    switchLines();
    gFocustxt = true;
    gFocusSticker = false;
    renderCanvas();
}