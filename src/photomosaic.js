export default (function(window) {

    'use-strict';

    var data=JSON.parse(localStorage.getItem("data"));

    var datas=new Object();
    datas[0]={
        'length':parseInt(data['info'].length),//문자열을 숫자로 변환
        'size_w':parseInt(data['info'].size_w),
        'size_h':parseInt(data['info'].size_h)
    };
    for(var i=0;i<datas[0].length;i++){
        datas[i+1]={
            'x':parseInt(data['faces'][i].x),
            'y':parseInt(data['faces'][i].y),
            'width':parseInt(data['faces'][i].width),
            'height':parseInt(data['faces'][i].height)
        };
    }
    /*
    datas={
        0:{length: 3, size_w: 960, size_h: 960}
        1:{x: 433, y: 382, width: 97, height: 97}
        2:{x: 355, y: 364, width: 71, height: 71}
        3:{x: 168, y: 504, width: 16, height: 16}
        ...
    }
    */

    var dataURL=[];
    var mosaic=[];

    function PhotoMosaic(options) {
        if (!options.image) {
            throw new Error('image options is not passed');
        }

        this.options = this.extend(this.defaults, options);

        if (this.options.image.complete) {
            this.process();
        } else {
            this.options.image.onload = this.process.bind(this);
        }
    }

    PhotoMosaic.prototype.process = function() {
        this.options.divX = Math.floor(this.options.width / this.options.tileWidth);
        this.options.divY = Math.floor(this.options.height / this.options.tileHeight);
        var context = this.renderImage();
        this.tileCanvas(context);
    };

    /**
     * Extends a Javascript Object
     * @param  {object} destination The object in which the final extended values are save
     * @param  {object} sources     The objects to be extended
     * @return {}
     */
    PhotoMosaic.prototype.extend = function(destination, sources) {
        for (var source in sources) {
            if (sources.hasOwnProperty(source)) {
                destination[source] = sources[source];
            }
        }
        return destination;
    };

    /**
     * The defaults options object
     * @type {Object}
     */
    PhotoMosaic.prototype.defaults = {
        'image': null,
        'tileWidth': 15,
        'tileHeight': 15,
        'tileShape': 'rectangle',
        'opacity': 1,
        'width': datas[0].size_w,
        'height': datas[0].size_h,
        'defaultBackground': 'rgba(0, 0, 0, 0)'
    };

    /**
     * Renders the image with an default background on a canvas before processing the pixels
     * @return {object} Context of the canvas created
     */
    PhotoMosaic.prototype.renderImage = function() {
        var options = this.options;
        var canvas = document.createElement('canvas');

        canvas.width = options.tileWidth * options.divX;
        canvas.height = options.tileHeight * options.divY;

        var context = canvas.getContext('2d');

        context.fillStyle = options.defaultBackground;
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.closePath();
        context.fill();

        context.drawImage(options.image, 0, 0, canvas.width, canvas.height);//han picture
        return context;
    };

    /**
     * Returns the average color of the canvas.
     * @param  {Array} data     The data received by using the getImage() method
     * @return {Object}         The object containing the RGB value
     */
    PhotoMosaic.prototype.getAverageColor = function(data) {
        var i = -4,
            pixelInterval = 5,
            count = 0,
            rgb = {
                r: 0,
                g: 0,
                b: 0
            },
            length = data.length;

        while ((i += pixelInterval * 4) < length) {
            count++;
            rgb.r += data[i];
            rgb.g += data[i + 1];
            rgb.b += data[i + 2];
        }

        // floor the average values to give correct rgb values
        rgb.r = Math.floor(rgb.r / count);
        rgb.g = Math.floor(rgb.g / count);
        rgb.b = Math.floor(rgb.b / count);

        return rgb;
    };


    /**
     * Divides the whole canvas into smaller tiles and finds the average
     * colour of each block. After calculating the average colour, it stores
     * the data into an array.
     *
     * @param context   Context of the canvas
     */
    PhotoMosaic.prototype.tileCanvas = function(context) {
        var processedCanvas = document.createElement('canvas');
        var width = processedCanvas.width = context.canvas.width;
        processedCanvas.height = context.canvas.height;

        var processedContext = processedCanvas.getContext('2d');
        var options = this.options;

        var originalImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

        for(var k=0;k<datas[0].length;k++){
            for (var i = 0; i < options.divY; i++) {
                for (var j = 0; j < options.divX; j++) {
                    
                    var x = j * options.tileWidth,
                        y = i * options.tileHeight;
                    var imageData = this.getImageData(x, y, width, originalImageData);
                    var averageColor = this.getAverageColor(imageData);
                    var color = 'rgba(' + averageColor.r + ',' + averageColor.g + ',' + averageColor.b + ',' + this.options.opacity + ')';
                    processedContext.fillStyle = color;

                    // CFR을 통해 받아온 영역 : 모자이크 처리
                    // 이외의 배경 영역 : 투명 이미지 처리
                    if ( (j > datas[k+1].x/options.tileWidth && j < (datas[k+1].x+datas[k+1].width)/options.tileWidth) && (i > datas[k+1].y/options.tileHeight && i < (datas[k+1].y+datas[k+1].height)/options.tileHeight))  {
                        this.createMosaic(x, y, processedContext);
                    } else {
                        // 얼굴 이외의 영역은 이미지 처리
                        this.clearRactImage(x, y, processedContext);
                    }
                }
            }


            // 모자이크 처리된 Canvas 영역을 이미지 URL로 정의
            // HTML IMG SRC 부분에 BASE64로 인코딩 되어 삽입됨
            dataURL[k] = processedCanvas.toDataURL();
            document.getElementsByClassName('resultImage')[k].src = dataURL[k];

        }

        /*원본 + 모자이크*/
        var canvas = document.getElementById("mergeCanvas");
        var ctx = canvas.getContext("2d");

        var img1 = loadImage('http://localhost:3000/han.jpg', main);//원본
        for(var k=0; k<datas[0].length; k++){
            mosaic[k] = loadImage(dataURL[k], main);//모자이크
        }

        var imagesLoaded = 0;

        function main() {
            imagesLoaded += 1;

            if (imagesLoaded == datas[0].length) {//모자이크할 부분이 모두 모였다면
                // composite now
                ctx.globalAlpha = 1;//원래사진(1은 선명하게, 0은 투명하게)
                ctx.drawImage(img1, 0, 0);

                for(var k=0; k<datas[0].length; k++){
                    ctx.globalAlpha = 1;//모자이크부분
                    ctx.drawImage(mosaic[k], 0, 0);
                }
            }
        }

        function loadImage(src, onload) {
            var img = new Image();

            img.onload = onload;
            img.src = src;

            return img;
        }

    };

    /**
     * Creates an array of the image data of the tile from the data of whole image
     * @param  {number} startX            x coordinate of the tile
     * @param  {number} startY            y coordinate of the tile
     * @param  {number} width             width of the canvas
     * @param  {object} originalImageData imageData if the whole canvas
     * @return {array}                    Image data of a tile
     */
    PhotoMosaic.prototype.getImageData = function (startX, startY, width, originalImageData) {
        var data = [];
        var tileWidth = this.options.tileWidth;
        var tileHeight = this.options.tileHeight;
        for (var x = startX; x < (startX + tileWidth); x++) {
            var xPos = x * 4;
            for (var y = startY; y < (startY + tileHeight); y++) {
                var yPos = y * width * 4;
                data.push(
                    originalImageData.data[xPos + yPos + 0],
                    originalImageData.data[xPos + yPos + 1],
                    originalImageData.data[xPos + yPos + 2],
                    originalImageData.data[xPos + yPos + 3]
                );
            }
        }
        return data;
    };

    /**
     * Creates a block of the mosaic. This is called divX*divY times to create all blocks
     * of the mosaic.
     * @param  {number} x          x coordinate of the block
     * @param  {number} y          y coordinate of the block
     * @param  {object} context    Context of the result canvas
     * @return {}
     */
    PhotoMosaic.prototype.createMosaic = function(x, y, context) {

        var tileWidth = this.options.tileWidth;
        var tileHeight = this.options.tileHeight;

        if (this.options.tileShape === 'circle') {
            var centerX = x + tileWidth / 2;
            var centerY = y + tileHeight / 2;
            var radius = Math.min(tileWidth, tileHeight) / 2;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        } else if (this.options.tileShape === 'rectangle') {
            var height = tileHeight;
            var width = tileWidth;
            context.beginPath();
            context.rect(x, y, width, height);
            context.closePath();
            context.fill();
        }
    };

    PhotoMosaic.prototype.clearRactImage = function(x, y, context) {
        var tileWidth = this.options.tileWidth;
        var tileHeight = this.options.tileHeight;

        var height = tileHeight;
        var width = tileWidth;

        context.beginPath();
        context.clearRect(x, y, width, height);
        context.closePath();
        context.fill();
    };

    window.PhotoMosaic = PhotoMosaic;

}(window));