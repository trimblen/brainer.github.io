class DbScores {

    var url;
    
    constructor (url){
       
        this.url = url;
        
    }
    
    updateScore(user_score, user_id, user_level){
     
        if (window.XMLHttpRequest) {
            
            // code for modern browsers
            var xReq  = new XMLHttpRequest();
            
         } else {
             
            // code for old IE browsers             
            var xReq  = new ActiveXObject("Microsoft.XMLHTTP");
        }
  
        const params        = "&user_id=" + user_id+ "&user_level=" + user_level + "&user_score=" + user_score + "&write=" + 1;
        xReq.responseType   = "json";
        
        console.log(this.url);
        
        xReq.open("POST", this.url+params, true);
        
        xReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xReq.addEventListener("readystatechange", () => {

            if (xReq.readyState === 4 && xReq.status === 200) {
                
                let obj = xReq.response;

                return obj;   
                
            }else{
                
                //console.log(xReq.response);
                
            }
            
        });

        xReq.send();        
        
    }
    
    
    getScore(user_id, user_level, score = 0){
  
        if (window.XMLHttpRequest) {

            // code for modern browsers
            var xReq  = new XMLHttpRequest();

         } else {

            // code for old IE browsers             
            var xReq = new ActiveXObject("Microsoft.XMLHTTP");
        }

        const params        = "&user_id=" + user_id+ "&user_level=" + user_level + "&write=" + 0 + "&user_score="+score;
        xReq.responseType   = "json";

        console.log(this.url);

        xReq.open("POST", this.url+params, true);

        xReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xReq.addEventListener("readystatechange", () => {

            if (xReq.readyState === 4 && xReq.status === 200) {

                let obj = xReq.response;

                return obj;       

            } else {

                //console.log(xReq.response);
            }

        });

        xReq.send();

    }


}
