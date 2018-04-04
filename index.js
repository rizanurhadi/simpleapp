const { Pool, Client } = require('pg')
var Excel = require('exceljs');
const path = require('path');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'vessell',
    password: 'admin',
    port: 5432,
  });
  var lng,ltd
  var i = 2; 
  var workbook = new Excel.Workbook();
  var filename = path.join(__dirname, './vessel_movement.xlsx');
  Client.setTimeout = 30000;
  
  function read_and_input(iteration,end_iteration){
    setTimeout(function () { 
    console.log('loading excel')
    
    workbook.xlsx.readFile(filename)
    .then(function() {
      var worksheet = workbook.getWorksheet('Sheet2');
      
         lng = worksheet.getCell('A'+iteration).value;
         ltd = worksheet.getCell('B'+iteration).value;
         vname = worksheet.getCell('C'+iteration).value;
        console.log('loading data to table : ' + 'INSERT INTO public.tracking(lng,ltd,vessel_name) VALUES(\''+lng+'\',\''+ltd+'\')' )
        client.query('INSERT INTO public.tracking(lng,ltd,vessel_name) VALUES(\''+lng+'\',\''+ltd+'\',\''+vname+'\')')
          .then(res => console.log(iteration + ' save success '))
          .catch(e => console.error(e.stack))
          iteration++;
        if (iteration < end_iteration) {            
          read_and_input(iteration,end_iteration);      
       } else{
         
       }       
    })
  }, 3000)
  }
  client.connect();
  read_and_input(2,13);//.then(function(){ client.end()});
  read_and_input(13,22);
  read_and_input(22,35);
  read_and_input(35,51);
 /*  setTimeout(function(){
          
    client.query('INSERT INTO public.tracking(lng,ltd) VALUES(\''+lng+'\',\''+ltd+'\')', (err, res) => {
      console.log(err, res)
      client.end()
    })
  }, 3000); */