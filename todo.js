var sub=document.querySelector("#sub");
var input=document.querySelector("#content");
var now=document.querySelector(".now ul");
var done=document.querySelector(".done ul");
var nownum=document.querySelector(".now .num");
var donenum=document.querySelector(".done .num");
var clear=document.querySelector("#clear");
function getData(){
   var data=JSON.parse(localStorage.getItem("todo"));
   return data||[];
}
function saveData(data){
    localStorage.setItem("todo",JSON.stringify(data));
}
function delData(index){
    var data=getData();
    data.splice(index,1);
    saveData(data);
    reWrite();
}
function changeData(index,content){
    var data=getData();
    data[index].content=content;
    saveData(data);
}
function changeState(index){
    var data=getData();
    data[index].done=!data[index].done;
    saveData(data);
    reWrite()
}
function reWrite(){
   var data=getData();
   var str1="",str2="",num1=0,num2=0;
   data.forEach(function(value,index){
       if(!value.done){
         str1+="<li><input type=checkbox onfocus=changeState("+index+");><span>"+index+":</span><div contenteditable='true' onblur=changeData("+index+",this.innerHTML)  class=con>"+value.content+"</div><div class=del onclick=delData("+index+")>删除</div></li>";
           num1++;
       }else{
           str2+="<li><input type=checkbox onfocus=changeState("+index+")><span>"+index+":</span><div class=con>"+value.content+"</div><div class=del onclick=delData("+index+")>删除</div></li>";
           num2++;
       }
   });
    now.innerHTML=str1;
    done.innerHTML=str2;
    nownum.innerHTML=num1;
    donenum.innerHTML=num2;

}
sub.onclick=function(){
    if(input.value==""){
        return;
    }
    var data=getData();
    data.push({content:input.value,done:false});
    input.value="";
    saveData(data);
    reWrite();
};
clear.onclick=function(){
    var data=[];
    saveData(data);
    reWrite();
};
reWrite();