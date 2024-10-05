"use strict";
//import testEngine from "./test.json" ;
//import testEngine2 from "./data.json" ;
//console.log(testEngine2);

let data, data2; // Declare variables to store JSON data
 
data=await loadData();
data2=await loadData2();
console.log(data);
console.log(data2);
//let data2 = [];
 
   //    data2=testEngine2;

//let data = [];
let html;
const filePaths = [];

RenderHTMLReport();
addScreenshot();
window.onload = function() {
   // convertImageToBase64() ;
   // downloadHTML();
  };
  
 // addScreenshot();

 async function loadData() {
  try {
    // Fetch the first JSON file
    const response1 = await fetch('./test.json');
    if (!response1.ok) {
      throw new Error('Network response was not ok');
    }
    data= await response1.json();
  
    return data;
    

    
  } catch (error) {
    console.error('Error:', error);
  } 
}

async function loadData2() {
  try {
   
    
    // Fetch the second JSON file
    const response2 = await fetch('./data.json');
    if (!response2.ok) {
      throw new Error('Network response was not ok');
    }
    data2= await response2.json();
   
    return data2;
    
  } catch (error) {
    console.error('Error:', error);
  } 
}

function RenderHTMLReport() {
	//debugger;
   


   
    console.log('convert');
    // Fetch the first JSON file
    
    
    console.log(data);

    let reportToRender = document.getElementById('report-container');
    console.log('out');
    console.log(data);
     html = json2html.render(data, template);
    reportToRender.innerHTML = html;

    
}

function readFile(event) {
    document.getElementById('file-upload').disabled = true;

    const jsonFile = event.target.files[0];
	//debugger;
    loadAsText(jsonFile);
    console.log('in');
    console.log(data);
   
}

function loadAsText(theFile) {
    const reader = new FileReader();
    reader.onload = function (loadedEvent) {
        data = loadedEvent.target.result;
    }
    reader.readAsText(theFile);
    document.getElementById('generate-report').disabled = false;
}


function downloadHTML() {
   
    const head = document.getElementsByTagName("head")[0];
    const links = head.getElementsByTagName("link");
    const cssPromises = [];
    for (let i = 0; i < links.length; i++) {
        if (links[i].rel === "stylesheet") {
            cssPromises.push(fetch(links[i].href).then(response => response.text()));
        }
    }
    Promise.all(cssPromises).then(function(cssContents) {
        let css = "";
        cssContents.forEach(function(cssContent) {
            css += cssContent;
        });
        const htmlContent = "<style>" + css + "</style>" + document.documentElement.outerHTML;
        const fileName = "test.html";
        const blob = new Blob([htmlContent], {
            type: "text/html"
        });
        const link = document.createElement("a");
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
    });
}

function convertImageToBase64() {
    var imageUrl="./aria-required-children_Voilation 1_Node_1_1706712213398.png";
     
    var count=0;
     
   // var img = new Image();
  // window.onload = function() {
    for (var i = 0; i < 33; i++) {
        var RowOfFirstTable=document.querySelectorAll("tr>td>a>img");
    var img = new Image();
    img.crossOrigin = "Anonymous";
      var canvas = document.createElement("canvas");

      img.src = "./HomePage/"+(i+1)+".png";

      canvas.width = img.width;
      canvas.height = img.height;
 
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
 
      var dataURL = canvas.toDataURL("image/png");
      //callback(dataURL);
      //console.log(RowOfFirstTable[i].getAttribute("alt"));
      RowOfFirstTable[count].src=dataURL;
      //count++;
  //  }
    };
 
    

  }

  // Array of file paths

 
// Function to convert image to base64
function convertToBase64(filePath) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(filePath);
  });
}
 
// Function to replace img src with base64 string
function replaceImgSrc(base64Strings) {
    const anchorTags = document.querySelectorAll('tr>td>a[target=_blank]');
  anchorTags.forEach((anchor, index1) => {
    anchor.href = `data:image/png;base64,${base64Strings[index1]}`;
  });
  const imgTags = document.querySelectorAll('tr>td>a>img');
  imgTags.forEach((img, index) => {
    img.src = `data:image/png;base64,${base64Strings[index]}`;
  });
  
  downloadHTML();
}
 
// Loop through each file path and convert to base64
async function convertImagesToBase64() {
  const base64Strings = [];
  for (const filePath of filePaths) {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const base64String = await convertToBase64(blob);
    base64Strings.push(base64String);
  }
  return base64Strings;
}
  


function addScreenshot(){

   var voilations_count=document.querySelector("#report-container > h2 > span.count-of-violations").innerHTML;
  var RowOfFirstTable=document.querySelectorAll("section>table>tbody>tr");
 
   
  var mapData =new Map(Object.entries(data2));
 // var imageOfVoilation=[];
 for (var i = 0; i < voilations_count; i++) {
 
   // var ImageLocationPath="./aria-required-children_Voilation 1_Node_1_1706712213398.png";
   //var RowOfFirstTable=document.querySelector("#view-aria-required-children-issues > table > tbody > tr");

        var tdOfImage = document.createElement("td");
        var thumbnail = document.createElement("a");
        
        var imageOfVoilation = document.createElement("img");
        
        imageOfVoilation.width = "300";




       
        
        imageOfVoilation.alt = "Description of the image"; 
        
        

        thumbnail.setAttribute('feature','light');
        thumbnail.target="_blank";
        //thumbnail.re="noopener";

        
         
        thumbnail.appendChild(imageOfVoilation);
        tdOfImage.appendChild(thumbnail);
        
       
        
        RowOfFirstTable[i].appendChild(tdOfImage);
        //setTimeout();
  console.log("test"+i)
  let newpath="./Screenshot/"+mapData.get(""+i+"");
  filePaths.push(newpath);
   }
// Call the function and replace img src
convertImagesToBase64()
  .then(base64Strings => replaceImgSrc(base64Strings))
  .catch(error => console.error(error));
   //convertImageToBase64();

}

