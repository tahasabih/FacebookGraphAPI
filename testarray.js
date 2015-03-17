/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    var logarray=[];
    var logarray2=[];
    var i=0;
    var j=0;
    var k=0;
    var str="";
    var loc="";
    geocoder = new google.maps.Geocoder();
    var offs=0;
    var intrv;
    

        //window.alert(offs);
	function call1 (callback) {
    $.ajax({
		url:'https://graph.facebook.com/search?q=humans%20of&type=page&fields=name&limit=30&access_token=<access token>',
		dataType: 'json',
		type: 'get',
		cache: true,
		success: function(data) {
			$(data.data).each(function(index, value) {
                                        $.ajax({
                                  					url:'https://graph.facebook.com/'+value.id,
                                  					dataType: 'json',
                                  					type: 'get',
                                  					cache: true,
                                  					success: function(data1) {
					                                          logarray.push({
                                      							"name": value.name,
                                      							"url": data1.link,
                                                     });
                                                    k++;
                                                    console.log(k);
                                                                      }                         
                                              });
			
        					                          });
                          }
        	});
        setTimeout(callback, 5000);
     }

call1(function () {
  window.open("data:text/json;charset=utf-8," + escape(JSON.stringify(logarray)));
  console.log("yo "+logarray.length);
  var delay=1000;
  intrv = setInterval(function(){geocodenow(logarray)}, delay);
})

        
function geocodenow(arry) {
   geocoder.geocode( { 'address': arry[j].name.substr(10)}, function(results, status) {
      console.log(j+" mamamia ");
      if (status == google.maps.GeocoderStatus.OK) {
          lat1 = results[0].geometry.location.lat();
          lon1 = results[0].geometry.location.lng();

          logarray2.push({
          "name": arry[j].name,
          "url": arry[j].url,
          "lat":lat1,
          "lng": lon1 
          });

          j++;
          if (j==arry.length) {
            window.open("data:text/json;charset=utf-8," + escape(JSON.stringify(logarray2)));
            clearInterval(intrv);
          }
          } else  if (status == google.maps.GeocoderStatus.ZERO_RESULTS || status == google.maps.GeocoderStatus.INVALID_REQUEST) {
            console.log('Geocode was not successful for the following reason: ' + status);
            j++;
          }
    
    });
}

        
          
      
    	
      
   
    

