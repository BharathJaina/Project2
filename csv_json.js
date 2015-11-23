var fs=require('fs');


var files=[];
files[0]='CSV/India2011.csv';
files[1]='CSV/IndiaSC2011.csv';
files[2]='CSV/IndiaST2011.csv';
var myObj=[];


for(var i in files ){
  var data= fs.readFileSync(files[i],'utf8');
  var dataLines=data.split("\n");
      for(var j in dataLines){
        var line=dataLines[j].split(",")
        if((line[4]=='Total')&&(line[5]=='All ages')){
            //console.log(dataLines[j]);
            var stateCode=parseInt(line[1])-1;
          //  var statedata=myObj[stateCode];
            var state={};
            state.stateName         = line[3].split("-")[1].trim();
            state.illiterateMale    = parseInt(line[10]);
            state.illiterateFemale  = parseInt(line[11]);
            state.literateMale      = parseInt(line[13]);
            state.literateFemale    = parseInt(line[14]);

            if(myObj[stateCode] == undefined){
              myObj[stateCode]  = state;
            //  console.log(stateCode);
            }
            else{
            //  console.log(stateCode + ' ' + myObj[stateCode].illiterateMale +' '+ state.illiterateMale );
              myObj[stateCode].illiterateMale   = parseInt( myObj[stateCode].illiterateMale)  + state.illiterateMale;

              myObj[stateCode].illiterateFemale = parseInt( myObj[stateCode].illiterateFemale)+ state.illiterateFemale;
              myObj[stateCode].literateMale     = parseInt( myObj[stateCode].literateMale)    + state.literateMale;
              myObj[stateCode].literateFemale   = parseInt( myObj[stateCode].literateFemale)  + state.literateFemale;
            }

        }

      }
}

fs.writeFileSync('object.json',JSON.stringify(myObj,null,2),'utf8');
// var myObj=JSON.parse(fs.readFileSync('object.json','utf8'));
// console.log(myObj[1]);
