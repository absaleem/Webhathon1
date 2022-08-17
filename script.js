var div_container=document.createElement("div");
div_container.setAttribute("class","container");
var div_row=document.createElement("div");
div_row.setAttribute("class","row text-center");

var div_1=document.createElement("div");
div_1.setAttribute("class","col-lg-12 col-sm-12");

var h1_tag=document.createElement("h1");
h1_tag.setAttribute("id","title");
h1_tag.setAttribute("class","text-center");
h1_tag.style.textAlign='center';
h1_tag.style.marginTop='100px';
h1_tag.innerHTML='Predict the nationality of a name';

var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","name");

var button=document.createElement("button");
button.setAttribute("type","button");
button.setAttribute("class","btn btn-primary");
button.innerHTML="Search";
button.addEventListener("click",foo);

var div_parent=document.createElement("div");
div_parent.setAttribute("class","col-lg-12");
div_parent.setAttribute('id','div_parent')

div_1.append(h1_tag,input,button);
div_row.appendChild(div_1);
div_container.appendChild(div_row);
document.body.append(div_container);

async function foo(){
    let res=document.getElementById("name").value;  var div_content=''; div_parent.innerHTML='';
     
    try{
    var url=`https://api.nationalize.io/?name[]=${res}`;
    let result=await fetch(url);
    let result1=await result.json();
    var div_content='';
    for(var i in result1){     
       var div1=document.createElement("div");
       div1.setAttribute("class","col-lg-4");
    
       var div2=document.createElement("div");
       div2.setAttribute("class","col-lg-4");
       div2.style.marginTop='10px';
       div2.style.display='inline-grid';
      
       var div3=document.createElement("div");
       div3.setAttribute("class","col-lg-4");
    
      var div_content=`<div class="card text-white bg-dark mb-4" style="max-width: 18rem;">
        <div class="card-header">Name: ${result1[i].name}</div>
          <div class="card-body">`;
            var countries=result1[i].country; var ct=1;
            for(var j in countries){ 
                    if(ct<3){
                    div_content+=`<h6 class="card-title">${ct}) Country : ${countries[j].country_id}<br/> Probability : ${countries[j].probability}</h6>`;
                    }  
                 ct++;
                }
            div_content+='</div></div></div>';
        }
        div2.innerHTML=div_content;   
    }catch{
        div_row.innerHTML='<span>Error</span>';   
    }
    div_parent.append(div1,div2,div3);
    div_row.append(div_parent);
}
