'use strict';

var gSavedImgs;
var gSavedMemes;
const keyMemes = 'Memes';
const keyImgs = 'Imgs';

var gKeywords = {
    'happy': 12,
    'funny': 1,
    'celebrity': 7,
    'politic': 2,
    'cute': 12,
    'animal': 1,
    'books': 0,
    'comics': 6,
    'cartoon': 0,
    'baby': 1,
    'love': 7,
    'sport': 2,
    'kid': 12,
    'dog': 2,
    'cat': 2,
    'drinks': 0,
    'movie': 4,
    'tv': 7,
}

var gImgs = [{
    id: 1,
    url: 'img/1.jpg',
    keywords: ['politic', 'tramp', 'funny']
}, {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['happy', 'cute', 'love', 'dog', 'animal']
}, {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['happy', 'cute', 'love', 'dog', 'baby', 'animal', 'kid']
}, {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['happy', 'cute', 'cat', 'baby', 'animal', 'kid']
}, {
    id: 5,
    url: 'img/5.jpg',
    keywords: ['happy', 'baby', 'funny', 'kid']
}, {
    id: 6,
    url: 'img/6.jpg',
    keywords: ['movie', 'tv', 'celebrity']
}, {
    id: 7,
    url: 'img/7.jpg',
    keywords: ['happy', 'baby', 'funny', 'kid']
}, {
    id: 8,
    url: 'img/8.jpg',
    keywords: ['movie', 'celebrity']
}, {
    id: 9,
    url: 'img/9.jpg',
    keywords: ['happy', 'baby', 'funny', 'evil', 'kid']
}, {
    id: 10,
    url: 'img/10.jpg',
    keywords: ['politic', 'obama', 'funny']
}, {
    id: 11,
    url: 'img/11.jpg',
    keywords: ['sport']
}, {
    id: 12,
    url: 'img/12.jpg',
    keywords: ['honesty', 'justice']
}, {
    id: 13,
    url: 'img/13.jpg',
    keywords: ['movie', 'celebrity']
}, {
    id: 14,
    url: 'img/14.jpg',
    keywords: ['movie', 'celebrity']
}, {
    id: 15,
    url: 'img/15.jpg',
    keywords: ['movie', 'celebrity']
}, {
    id: 16,
    url: 'img/16.jpg',
    keywords: ['movie', 'celebrity']
}, {
    id: 17,
    url: 'img/17.jpg',
    keywords: ['politic', 'putin', 'funny']
}, {
    id: 18,
    url: 'img/18.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 19,
    url: 'img/19.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 20,
    url: 'img/20.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 21,
    url: 'img/21.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 22,
    url: 'img/22.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 23,
    url: 'img/23.jpg',
    keywords: ['movie', 'cartoon']
}, {
    id: 24,
    url: 'img/24.jpg',
    keywords: ['movie', 'cartoon']
}]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [{
        txt: 'I Never Play Basketball',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 50,
        isDragging: false
    }, {
        txt: 'I Love Basketball',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 250,
        positionY: 430,
        isDragging: false
    }],
    stickers: []
}

function getMeme() {
    return gMeme;
}

function getImges() {
    return gImgs;
}

function getKeywords() {
    return gKeywords;
}

function createImgs() {
    gImgs = [
        createImg(1, ['funny', 'sweet']),
        createImg(2, ['funny', 'scary']),
        createImg(3, ['funny', 'sweet']),
        createImg(4, ['funny', 'sweet']),
        createImg(5, ['funny', 'scary']),
        createImg(6, ['funny', 'sweet']),
        createImg(7, ['funny', 'sweet']),
        createImg(8, ['funny', 'scary']),
        createImg(9, ['funny', 'sweet']),
        createImg(10, ['funny', 'sweet']),
        createImg(11, ['funny', 'scary']),
        createImg(12, ['funny', 'sweet']),
        createImg(13, ['funny', 'sweet']),
        createImg(14, ['funny', 'scary']),
        createImg(15, ['funny', 'sweet']),
        createImg(16, ['funny', 'sweet']),
        createImg(17, ['funny', 'scary']),
        createImg(18, ['funny', 'sweet'])
    ]
}


function createImg(id, keywords) {
    var img = {
        id,
        url: `img/${id}.jpg`,
        keywords
    }
    return img
}

function setLineTxt(txt) {
    gMeme.lines[0] = txt
}

function updateMemeImg(id) {
    gMeme.selectedImgId = id
}

function getSelectedImg() {
    return gMeme.selectedImgId;
}

function deleteLine() {
    if (gMeme.lines.length === 0) return;
    if (gFocusSticker) return;
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = 0;
    gMeme.lines.splice(lineIdx, 1);
}

function switchLines() {
    if (gMeme.lines.length === 0) return;
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
}

function addLine() {
    var line = {
        txt: 'Add new text here',
        font: 'impact',
        size: 40,
        align: 'center',
        OutlineColor: 'black',
        fillColor: 'white',
        positionX: 225,
        positionY: 225
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changePosTexts(width, height) {
    gMeme.lines.forEach(line => {
        line.positionX = (width / 2)
        if (line.positionY > height) line.positionY = (height - 20);
    })
}