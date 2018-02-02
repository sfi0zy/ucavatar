// Ucavatar.js
// Unique avatars generator
//
// Version: 1.0.4
// Author:  Ivan Bogachev <sfi0zy@gmail.com>, 2017
// License: MIT

var Ucavatar = (function() {

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
    
        return (new Array(9).join('1') + Math.abs(hash)).slice(-8);
    }


    function getDecimal(num) {
        var str = '' + num,
            zeroPos = str.indexOf(".");

        if (zeroPos == -1) {
            return 0;
        }

        str = str.slice(zeroPos);

        return +str;
    }


    function hslToRgb(h, s, l){
        var r, g, b;

        if (s == 0){
            r = g = b = l;
        } else {
            var hue2rgb = function(p, q, t) {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }


    function getColorScheme(hash, alpha) {
        var colorScheme = [];

        var lastH = 0,
            lastS = 0,
            lastL = 0;

        for (var i = 0; i < 4; i++) {
            var H = (hash[i]*10 + hash[i+1]) / 1000,
                S = hash[i+2] * 0.05 + .5,
                L = hash[i+3] * 0.09 + .1,
                sign;

            if (Math.abs(H - lastH) < .3) {
                sign = H > lastH ? 1 : -1;
                H = getDecimal(H + sign * .2 + 1);
            }

            if (Math.abs(S - lastS) < .3) {
                sign = S > lastS ? 1 : -1;
                S = getDecimal(S + sign * .3 + 1);
            }

            if (Math.abs(L - lastL) < .3) {
                sign = L > lastL ? 1 : -1;
                L = getDecimal(L + sign * .3 + 1);
            }

            var rgb = hslToRgb(H, S, L);

            colorScheme.push('rgba(' +
                rgb[0] + ',' +
                rgb[1] + ',' +
                rgb[2] + ',' +
                alpha + ')'
            );

            lastH = H;
            lastS = S;
            lastL = L;
        }

        return colorScheme;
    }


    function getRectCoords(hash, size) {
        var coords = [];

        for (var i = 4; i < 8; i++) {
            var h = hash[i];

            if (hash[i] < 0.01) {
                h = i;
            }

            var c = h * size * .03,
                c1 = c,
                c2 = c,
                c3 = c,
                c4 = c;
        
            if (2 * c < (size / 2)) {
                c1 *= -2;
                c2 *= -2;
                c3 *= 5;
                c4 *= 5;
            }

            coords.push([c1, c2, c3, c4]);
        }

        return coords;
    }


    function drawRects(ctx, colors, coords, s) {
        for (var i = 0; i < 4; i++) {
            ctx.fillStyle = colors[i];
            c = coords[i];

            for (var j = 0; j < 2 * s; j++) {
                ctx.fillRect(c[0], c[1], c[2], c[3]);
                ctx.rotate(Math.PI / s);
            }
        }
    }


    function drawCircle(ctx, colors, size) {
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = colors[0];
        ctx.fill();
    }


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
            h = strangeHash(str),
            colors = getColorScheme(h, .5),
            rectCoords = getRectCoords(h, size),
            s = h[0] % 5 + 3;
    
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, size, size);

        ctx.translate(size/2, size/2);
        ctx.rotate(h[0] * Math.PI / (h[1] + 1)); 
        drawRects(ctx, colors, getRectCoords(h, size), s);

        ctx.rotate(Math.PI / 2);
        colors = getColorScheme(h, .8);
        drawRects(ctx, colors, getRectCoords(h, size/3), s);

        colors = getColorScheme(h, .7);
        drawCircle(ctx, colors, size/2);

        colors = getColorScheme(h, .8);
        drawCircle(ctx, colors, 3);

        colors = getColorScheme(h, .8);
        drawRects(ctx, colors, getRectCoords(h, size/3), s);
        ctx.rotate(Math.PI / 2);

        drawCircle(ctx, colors, size/5);
        colors = getColorScheme(h, 1);
        drawRects(ctx, colors, getRectCoords(h, size/6), s);
        ctx.rotate(Math.PI / 2);
        drawCircle(ctx, colors, size/8);
        drawRects(ctx, colors, getRectCoords(h, size/10), s);

        var colors2 = getColorScheme(h, .5);

        for (var i = 0; i < s; i++) {
            ctx.rotate(2 * Math.PI / s);
            ctx.translate(size/4, size/4);
            drawRects(ctx, colors, getRectCoords(h, size/(1.7*s)), s);
            drawCircle(ctx, colors2, size/(2*s));
            drawRects(ctx, colors, getRectCoords(h, size/(3*s)), s);
            ctx.translate(-size/4, -size/4);
        }
        
        ctx.rotate(Math.PI / s);

        for (var i = 0; i < s; i++) {
            ctx.rotate(2 * Math.PI / s);
            ctx.translate(size/(s*h[0]/10), size/(s*h[0]/10));
            drawRects(ctx, colors, getRectCoords(h, size/(3*s)), s);
            ctx.translate(-size/(s*h[0]/10), -size/(s*h[0]/10));
        }
    };

    return Ucavatar;

})();


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports.Ucavatar = Ucavatar;
} else {
    window.Ucavatar = Ucavatar;
}

