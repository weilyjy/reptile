var http = require("http");
var fs = require("fs");
// var sync=require('sync');
// var httpsync = require('httpsync');
var cheerio = require("cheerio");
var mongodb=require('mongodb');
//创建一个mongodb的客户端
var MongoClient = mongodb.MongoClient;
//创建连接数据库地址，user库
var DB_CONN_STR='mongodb://localhost:27017/XinHuaNews';
  var data = [{userName:userName,userPwd:userPwd}];
  function insertData(db) {
    // 在admin集合上进行数据插入
    var conn = db.collection('admin');
    conn.insert(data, function(err, results) {
      if(err) {
        console.log(err);
        return;
      } else {
      	req.session.userName = userName;
      	res.redirect('/');
      	console.log('注册成功');
      	db.close();
      
        // req.session.username = username;
      
        // //关闭数据库
        // db.close();
      }
    });
    MongoClient.connect(DB_CONN_STR, function(err, db) {
    if(err) {
      console.log(err);
      return;
    } else {
      console.log('数据库连接成功');
      insertData(db);
    }
  });
// var mysql = require('mysql');
/*var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoyao',
	password: '123456789',
	database: 'wangyiyanxuan'
});
connection.connect();*/
// http.get("http://you.163.com/item/list?categoryId=1010000&subCategoryId=1035001",function(res){
// 	var data = "";
// 	res.on("data",function(chunk){
// 		data+=chunk
// 	})
// 	res.on("end",function(){
// 		console.log(data)
// 	})
// })
fs.readFile("pachong.html", function(err, data) {
	if(err) throw err;
	//console.log(data.toString());
	var html = data.toString();
	console.log(html);
	const $ = cheerio.load(html,{decodeEntities: false})
	//console.log($(".item").eq(2).find("img").attr("src"))
	// var item = $(".thumb-item");
	
	// var item = $(".thumb-item");
	var item=$('.nav-list-wrapper').find('a');
	// console.log(html);
	console.log(item.length);
	var res=[];
   // var textData=[]; 
	for(var i = 0; i <item.length ; i++) {
		console.log($('.nav-list-wrapper').find('a').eq(i).html());
		// console.log($(".thumb-item .thumb-tit").eq(i).find("a").html());
		// console.log($(".bg-white").eq(i).find("a").attr("href"));
		// console.log($(".thumb-item .thumb-extra").eq(i).find("span").eq(1).html());
		// var type="法治";
		// var link = $(".bg-white").eq(i).find("a").attr("href");
		
		// link = link.split("_")[1].split('.')[0];
		// console.log(link);
 //  httpsync.get("http://m.xinhuanet.com/photo/2017-11/09/c_"+link+".htm",function(res){
	// var data = "";
	// // console.log(res);
	// res.on("data",function(chunk){
	// 	data+=chunk;

	//  });
	// res.on("end",function(){
	// 	// console.log(data);
	// 	fs.writeFileSync(link+".html",data , function (err) {
	// 	  if (err) throw err;
	// 	  	// console.log(res);
	// 	  	console.log('写入完成');
	// 	});
	// 	fs.open(link+".html",'r',function(err,fd){

	// 		fs.readFileSync(link+".html", function(err, data) {
	// 			if(err) throw err;
	// 			var html = data.toString();
	// 			const $ = cheerio.load(html)
	// 			var item = $("#p-detail");
	// 		// console.log(item.length);
			
			
	// 			// console.log($("#p-detail").find("img").eq(1).attr("src"));
	// 			// console.log($("#p-detail").text());
	// 			// var img="http://m.xinhuanet.com"+$("#p-detail").find("img").eq(1).attr("src");
	// 			var text=($("#p-detail").text());
	// 			// var type="法治";
	// 			// console.log($(".thumb-item .thumb-extra").eq(i).find("span").eq(1).html());
	// 			// var link = $(".m-detail").eq(i).find("a").attr("href");
				
	// 			// link = link.split("_")[1].split('.')[0];
	// 			// console.log(link);
	// 			var a={"id":link,"title":text,};   
	// 		// var aToStr=JSON.stringify(a);   
	// 			textData.push(a);	
	// 		var arr=JSON.stringify(textData);  
	// 		fs.appendFileSync('text.txt',arr , function (err) {
	// 	 	 	if (err) throw err;
	// 	  		// console.log(res);
	// 	  		console.log('写入完成');
	// 		})
	// 	})
	// })

	//  })
 // })
 	// var list =$(".thumb-item").eq(i).find("img").attr("src");
 	var list = $('.nav-list-wrapper').find('a').eq(i).html();
	/*var Cts = img;
if(Cts.indexOf("http://www.xinhuanet.com") > 0 )
{
    img =$(".thumb-item").eq(i).find("img").attr("src");
}else{
	 img ="http://www.xinhuanet.com"+$(".thumb-item").eq(i).find("img").attr("src");
}*/
// console.log(img);
		// var title = $(".thumb-item .thumb-tit").eq(i).find("a").html();
		// var source =$(".thumb-item .thumb-extra").eq(i).find("span").eq(1).html();
		// var a={"id":i,"img":img,"title":title,"source":source,"type":type};   
	// 	// // var aToStr=JSON.stringify(a);   
		res.push(list);	
	 };
	// console.log(res.length);
	// var arr=JSON.stringify(res);  
	console.log(res.length);
	fs.appendFile('Newslist.txt',res , function (err) {
		  if (err) throw err;
		  	// console.log(res);
		  	console.log('写入完成');
		

	})
})
	



// console.log(data);
