var Excel = require('exceljs');
const path = require('path');
//var csv =require('fast-csv');
var fs=require('fs');
var lng,ltd
var i = 2; 
var workbook = new Excel.Workbook();
var filename = path.join(__dirname, './vessel_movement.xlsx');


function read_and_input(iteration,end_iteration){
    setTimeout(function () { 
    console.log('loading excel')
    
    workbook.xlsx.readFile(filename)
    .then(function() {
      var worksheet = workbook.getWorksheet('Sheet2');
      
         lng = worksheet.getCell('A'+iteration).value;
         ltd = worksheet.getCell('B'+iteration).value;
         vname = worksheet.getCell('C'+iteration).value;
        //console.log('loading data to table : ' + 'INSERT INTO public.tracking(lng,ltd,vessel_name) VALUES(\''+lng+'\',\''+ltd+'\')' )
        console.log('write ' + iteration)
        fs.appendFileSync('my.csv','\n'+ lng + ',' + ltd + ','+ vname);
          iteration++;
        if (iteration < end_iteration) {            
          read_and_input(iteration,end_iteration);      
       } else{
         
       }       
    })
  }, 3000)
  }
  read_and_input(2,13);//.then(function(){ client.end()});
  read_and_input(13,22);
  read_and_input(22,35);
  read_and_input(35,51);

