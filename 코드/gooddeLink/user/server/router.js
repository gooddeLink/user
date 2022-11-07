const express=require("express");
const router=express.Router();

// /* Definition of Constant Variable */
var client_id = 'kg5pkw5kpn';
var client_secret = 'rt0px0r22Ljnv1jmJk73jifgqhGvehR4JGeqF9k7';

router.post('/change', function (req, res) {//사진 모자이크 처리 위함

    var imgData=req.files.file;

    //var imgData=req.files.imgFile;
    // console.log('12 imgData checking',imgData);
    // console.log('done?');

    // var imgData=req.body.imgInfo;
    console.log('12 imgData checking',imgData);
    console.log('done?');

    // var fs = require('fs');
    var x,y,width,height;
    var context=new Object();//객체 선언

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// */
    var request = require('request');
    //var api_url = 'https://naveropenapi.apigw.ntruss.com/vision/v1/celebrity'; // 유명인 인식
    var api_url = 'https://naveropenapi.apigw.ntruss.com/vision/v1/face'; // 얼굴 감지

    //var fs = require('fs');
    var _formData = {
        // image: JSON.stringify(imgData)
        // image: imgData
        image: fs.createReadStream(imgData)
        // image: fs.createReadStream(imgData).pipe(toFile.stream())
    };
    // console.log(_formData);

    console.log('checkcheck 32 32');

    var _req = request.post({url:api_url, formData:_formData,//formdata 이렇게 전송하는게 맞는지 확인하기
        headers: {
            'X-NCP-APIGW-API-KEY-ID':client_id, 
            'X-NCP-APIGW-API-KEY': client_secret, 
            'Content-Type': 'multipart/form-data'
        }
    }, function(error, response, body){
        console.log('36 start!!!!!!');
        //body는 json값(문자열로)
        console.log('34',body);
        var result=JSON.parse(body);//문자열을 json으로 변환
        //얼굴 x좌표 : result['faces'][0].roi.x
        //얼굴 y좌표 : result['faces'][0].roi.y
        //얼굴 width : result['faces'][0].roi.width
        //얼굴 height : result['faces'][0].roi.height

        var datas={'length':result['faces'].length, 'size_w':result['info'].size.width, 'size_h':result['info'].size.height};
        context[0]=datas;
        for(var i=0;i<result['faces'].length;i++){//얼굴 수만큼
            x=result['faces'][i].roi.x;
            y=result['faces'][i].roi.y;
            width=result['faces'][i].roi.width;
            height=result['faces'][i].roi.height;

            datas={'x':x,'y':y,'width':width,'height':height};
            context[i+1]=datas;
            /*
            context={
                0:{'length':.., 'size_w':.., 'size_h':...},
                1:{'x':.., 'y':.., 'width':.., 'height':..},
                2:{'x':.., 'y':.., 'width':.., 'height':..},
            }
            */
        }
    }).on('response', function(response) {
        console.log('is it working?');
        console.log('status',response.statusCode)
        console.log(response.headers['content-type'])
    });

    console.log('86',context);
    console.log( request.head  );
    // _req.pipe(res); // 브라우저로 출력
    /*//////////////////////////////////////////////////////////////////////////////////////////////////// */

    //해당 페이지로 정보 보내기
    var sendData;
    if (imgData){
        sendData={
            mosaic:'this is mosaic picture...'
        };
    }

    res.send(sendData);
});

router.get('/view', function (req, res) {
    res.render('change.ejs',{'data':context},function(err, html){//ejs파일로 context 내용을 data 이름으로 전달
        if(err) console.log('error',err);
        res.end(html);
    });
    delete context;
});

router.get("/", function (req, res) {
    res.send({test:"hi"});
});

module.exports=router;