// Ucavatar.js
// Unique avatars generator
//
// Author: Ivan Bogachev <sfi0zy@gmail.com>, 2017
// License: MIT


function strangeHash(str) {
    var hash = 0;
    
    if (str.length === 0) {
        return hash;
    }
    
    for (var i = 0, len = str.length; i < len; i++) {
        var chr = str.charCodeAt(i);

        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    
    return (new Array(9).join('1') + Math.abs(hash)).slice(-8).replace(/0/g, '1');
};


function Ucavatar(canvas, str, size) {
    if (typeof canvas === 'string') {
        canvas = document.querySelector(canvas);
    }

    if (!canvas || !document.body.contains(canvas)) {
        throw new Error('Ucavatar: canvas does not exists');
    }

    if (!size) {
        size = 64;
    }

    canvas.height = size;
    canvas.width = size;

    var ctx  = canvas.getContext('2d'),
        h    = strangeHash(str);
    
    ctx.translate(size/2, size/2);
    ctx.rotate(Math.PI / 4);
    
    for (var i = 0; i < 8; i++) {
        var r = h[0] * 100 % 255,
            g = h[i] * 100 % 255,
            b = h[8 - i] * 100 % 255,
            a = h[i] / 20;
       
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        var c1 = h[i]*h[i] % 16,
            c2 = h[i]*h[7] % 16,
            c3 = h[i]*h[0] % 32,
            c4 = h[i]*h[0] % 32;
        
        if (c1 + c2 < 32) {
            c1 *= -2;
            c2 *= -2;
            c3 *=  2;
            c4 *=  2;
        }
        
        c1 = c1 * size / 64;
        c2 = c2 * size / 64;
        c3 = c3 * size / 64;
        c4 = c4 * size / 64;
      
        var s = h[7] % 2 + 2;
        
        for (var j = 0; j < 2 * s; j++) {
            ctx.fillRect(c1, c2, c3, c4);
            ctx.rotate(Math.PI / s);
        }
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports.Ucavatar = Ucavatar;
} else {
    window.Ucavatar = Ucavatar;
}

