/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import moment   from 'moment';

import  bodyParser  from "body-parser";
import { send } from "process";
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
multer().single('files')
dotenv.config();
var fileupload = require("express-fileupload");

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
    app.use(fileupload());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "+50mb", extended: true, parameterLimit:500000}));


//   example();
function isThereFile(letter=null){
    const fs = require('fs');
    let lectura = false;
        try {
        const data = fs.readFileSync('data.json', 'utf8');
        
    
        return JSON.parse(data);
        } catch (err) {
        // NO EXISTE
        return false;
        // console.error(err);
        }
}

app.get("/getParkingsDate",(req,res) => {
    // res.send("JEJE");
    let id = req.query.id;
    let price_:any = req.query.price;
    let init = req.query.dateInit+"T00:00:01";
    let end = req.query.dateEnd+"T00:00:01";


    let initMonth :any = moment(init,"YYYY-MM-DD").format("MM")+"";
    let enedMonth :any = moment(end,"YYYY-MM-DD").format("MM")+"";
    let initDay :any = moment(init,"YYYY-MM-DD").format("DD")+"";
    let endDay :any = moment(end,"YYYY-MM-DD").format("DD")+"";
    // let rangeEnd :any = moment(end,"YYYY-MM-01").format("MM")+"";
    // res.send(initDay);

    
    let rangeYearInit :any = moment(init,"YYYY-MM-01").format("YYYY")+"";
    let rangeYearEnd :any = moment(end,"YYYY-MM-01").format("YYYY")+"";
    let rangeYearTotal =  (parseInt(rangeYearEnd)-parseInt(rangeYearInit))+1; 

    let sameYearAndMonth = rangeYearEnd==rangeYearInit &&  initMonth == enedMonth ? true:false;
    // res.send(rangeTotal+" "+ (parseInt(rangeInit)-parseInt(rangeEnd)));
    let initMomentYear :any = moment(init,"YYYY-MM-01").format("YYYY")+"";
    
    // res.send(sameYearAndMonth + " ");
    let ArrayDataWithTotal:any = {};
    for (let index = 0; index < rangeYearTotal; index++) {
        let ArrayByDays:any = [];
        let sumTotal = 0.0;
    
    
        let year_ = parseInt(rangeYearInit)+index;
        ArrayDataWithTotal[year_] = {}; 
        // res.send(year_ + " ");
        let init_ = index ==0 ? init : `${year_}-01-01T00:00:00`;
        let rangeInit :any = moment(init_,"YYYY-MM-01").format("MM")+"";
        rangeInit = rangeInit-1
        let rangeEnd :any = moment(end,"YYYY-MM-01").format("MM")+"";
        let rangeTotal = (parseInt(rangeEnd)-parseInt(rangeInit))+1;
        let iInit=0;

        let initMes = rangeInit;
        let endMes = rangeEnd;

        if(rangeTotal<=0){
            // rangeTotal = 12;
            iInit=parseInt(rangeInit);
            // initMes 
            initMes = rangeInit;
            endMes = rangeEnd;
        }

        rangeTotal = 12;
        if(index!=0){
            initMes = 0;
            initMonth = initMes;
            // initMomentYear = initMomentYear +1
            rangeTotal = (parseInt(rangeEnd)-parseInt(rangeInit))+1;
            if(rangeTotal<0){
            
            }else{
                rangeTotal = rangeEnd;
            }

        }
        
            if(sameYearAndMonth===true){
                rangeTotal=initMes+1;
            }

        for (let i = initMes; i < (rangeTotal); i++) {
            // const element = array[i];
            let iPlus = (i+1)+"";
            let mesito =  iPlus.length == 1 ? "0"+(i+1): (i+1);
            if(iInit!=0){
                mesito = iInit;
            }
            // console.log(i);
            let arrayDays2 = Array.from(Array(moment(`${year_}-${mesito}`).daysInMonth()), (_, i_) => i_+1);
            // res.send(`${year_}-${mesito}`);
            
            // return ;
            let priceByDay_ = (parseInt(price_)/arrayDays2.length);
            let initDay_ =  parseInt(initDay);
            let endDay_ =  year_==rangeYearEnd && 
            enedMonth-1 == i
            ?  parseInt(endDay) :  arrayDays2[arrayDays2.length-1];

            // res.send(endDay_+" ");
            // endDay_
            let sumSubTotal = 0.0;
            let arrayDays = Array.from(Array(moment(`${year_}-${mesito}`).daysInMonth()), (_, i_) => 
            {   

                let value = 0;
                let json:any = {};
                let letter = i_ + 1;
                json["day"] = letter;
                json["price"] = false;
            
                if(i==initMonth-1){

            
                    if(((initDay_)-1) > i_){
                        json["price"] = false;
                    
                    }
                    else{

                        
                        json["price"] = true;
                
                    sumSubTotal = sumSubTotal + priceByDay_;
                    initDay_++;

                    if(initMonth==enedMonth && letter>endDay_-1
                    && sameYearAndMonth ===true
                
                        ){
                        json["price"] = false;
                    sumSubTotal = sumSubTotal - priceByDay_;
                
                    }

                    }

                
                }
                if(i>(initMonth-1) 
                && i<rangeTotal
                && i!=rangeTotal-1
                ){
                    // &&  letter < endDay_+1 ){
                    json["price"] = true;
                    // res.send("JEJE");
                    sumSubTotal = sumSubTotal + priceByDay_;
                    // initDay_++;
                }
                
                if(i==(rangeTotal-1)
                    // &&  letter < endDay_+1 AUN NO SE 
                    &&  letter < endDay_+1
                    ){
                        
                    
                    json["price"] = true;
                    // if(i==11 && year_==2022 &&  letter >4){
                    //     res.send(i+""+ endDay_);
                    // }
                    // console.log("JEJE");
                    sumSubTotal = sumSubTotal + priceByDay_;
                    if(sameYearAndMonth===true){
                        // rangeTotal=initMes+1;
                        // json["price"] =false;
                        // PERAME
                        sumSubTotal = sumSubTotal - priceByDay_;
                    }

                    // if(i==11 && year_==2022 &&  letter >4){
                    //     res.send(i+""+ endDay_);
                    // }
                }

            
                return     json ; 
            }
            );
            // let whatPrice = 
            sumTotal = sumTotal+ Math.round(sumSubTotal);
            // sumTotal = sumTotal+ (sumSubTotal);
            let a = {
                days: arrayDays  , 
                // subTotal : Math.round(sumSubTotal),
                subTotal : Math.round(sumSubTotal),
                priceByDay: priceByDay_ } ;

            
                

                ArrayByDays.push(a);

        }

        // res.send({data:ArrayByDays,total:sumTotal});

        ArrayDataWithTotal[year_]={data:ArrayByDays,total:sumTotal};
    

    }



    let data = isThereFile();
    const fs = require('fs');
    let arrayAuxYes :any= [];
    let initCopy = req.query.dateInit+"T00:00:01";
    let endCopy = req.query.dateEnd+"T00:00:01";

    data.forEach( (element:any) => {
        // res.send(element);
        if(element.id==id){
            // res.send(("JE"));
            if(element.dateRange != "---"){
                
                let array_ = JSON.parse(element.dateRange);
                
                arrayAuxYes = array_;
                // res.send(array_[0]);
                (array_).forEach( (element:any) => {
                    // res.send((element));
                    let init2 =  element.init+"T00:00:00";;
                    let end2 = element.end+"T23:59:59";;
                    // element
                    // res.send(end + " "+ init2);
                    if( moment(initCopy).isBetween( moment(init2), moment(end2) ) ||
                        moment(endCopy).isBetween( moment(init2), moment(end2) )
                    ){
            //     // res.json( 'la fecha de hoy esta en el rango')
                        res.send(("NO PUEDES"));
                    }else{

            
                    }

                });


            }
            
            if(element.dateRange == "---"){
                let jsonString = {init:req.query.dateInit,end:req.query.dateEnd,data: ArrayDataWithTotal};
                element.dateRange = JSON.stringify([jsonString]);
                fs.writeFileSync('data.json', JSON.stringify(data));
                res.send(data);
                // res.send((true));
            }else{

                let arraPush = {init:req.query.dateInit,end:req.query.dateEnd,data: ArrayDataWithTotal};
                arrayAuxYes.push(arraPush);
                element.dateRange = JSON.stringify(arrayAuxYes);
                fs.writeFileSync('data.json', JSON.stringify(data));
                // res.send()
                res.send(data);
            
            }

            
        }
    });


    res.send((false));

  
    res.send(data);
    
})

app.get("/getParkings",(req,res) => {

    let data = isThereFile();
    // let 

    let variablesGet = req.query ? req.query : null;

    if(data === false){
        // console.log("ESCRIBIR");
        data = [];
        // fs.writeFileSync('data.json', data_);
    }else{

        
    }
  
    res.send(data);
    
})

app.post("/getParkings2",(req,res) => {
    let variables_ = req.body ? req.body : null;
    let data = isThereFile();
    let typeS = variables_.type === null ? false : variables_.type.value;
    let priceS = variables_.price === null ? false : variables_.price.value;
    let amenitiesS = variables_.amenities === null ? false : variables_.amenities;
    // console.log(amenitiesS);
    
    if(amenitiesS==false && priceS==false && typeS==false){
        res.send(data);
        return ;    
    }
    ;

    let data_Aux = data;
    let dataAux : any= [];
    let dataAux2 : any= [];
    if(data === false){
        // console.log("ESCRIBIR");
        data = [];
        // fs.writeFileSync('data.json', data_);
    }else{
        
        
        if(typeS){
            // res.send(typeS)
            dataAux = data.filter((type:any) => type.type == typeS);
            data = dataAux;
            dataAux=[];
        }
        if(amenitiesS){
            // dataAux = 
            // dataAux=[];
            
            dataAux2= data.filter((type:any) => {
                let dataM = type;
                let jsonChecks = JSON.parse(type.checks);
                
                let countFind = 0;
                let tamanio = amenitiesS.length;
                let fin_ = amenitiesS.forEach( (element:any) => {
                    // let id = (element.id);
                    let id = (element.value);
                    // let aja = jsonChecks.find((type2:any) =>    id==type2.value );
                    let aja:any = [];
                        // aja.push( jsonChecks.find((type2:any) =>    id==type2.id) );
                        // let aa = jsonChecks.find((type2:any) => id==type2.id) ;
                        let aa = jsonChecks.forEach((type2:any) => { 

                            if(id==type2.id){
                                console.log(type2);
                                countFind++;
                                return type2;
                            }
                            
                            return false


                        }) ;
                        if(aa!=undefined){
                            aja.push(aa);
                        }

                        console.log(countFind);
                    
                    console.log("---");
                    return  aja;

                    // console.log(is);
                });
            
                return tamanio == countFind
                
            });
            data = dataAux2;

            }
        
        }

        
    if(priceS !== false){
        let whoSort = priceS=="max" ? 1 : -1;
    data.sort(function (a:any, b:any) {
        if (a.price > b.price) {
            return (-1*(whoSort));
        }
        if (a.price < b.price) {
          return (1*(whoSort));
        }
        // a must be equal to b
        return 0;
    });
    }

    res.send(data);
    return ;
    
})


// app.post("/insertParkings", [multer.single('attachment')] , (req:any,res:any) => {
    app.post("/insertParkings", (req:any,res) => {


    const fs = require('fs');

    // let preFile : any = req.files;
    let allFiles : any = req.files.files;  
    // let allFiles :any = [];    

    let dataReq:any  = req.body;
    let letterstreet = dataReq.street;
    
    dataReq["id"]= 1;
    dataReq["number"] = 1;
    dataReq["dateRange"] = "---";
    dataReq["files"] = allFiles;
    let data_ = JSON.stringify([dataReq]);
    let file_ = isThereFile(letterstreet);
    // let 
    if(file_ === false){
        console.log("ESCRIBIR");
        
        
        fs.writeFileSync('data.json', data_);
    }else{

        let arrayStreet:any = {A:0,B:0,C:0};
        
        file_.forEach( (element:any) => {
            let calle = element.street
            arrayStreet[calle] = arrayStreet[calle] + 1 ;
            // if(letterstreet === calle){
            //     arrayStreet[]
            // }
        });
        // for
        dataReq["id"] = file_.length+1 ;
        dataReq["number"] = arrayStreet[letterstreet]+1;
        file_.push(dataReq);
        console.log(file_.length);
        file_ = JSON.stringify(file_);
        fs.writeFileSync('data.json', file_);
        
    }
   
    res.send(data_);
    
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
