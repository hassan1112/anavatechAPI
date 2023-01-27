var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();
var config = require('../config/Config');
app.set('superSecret', config.SECRETE);



const db = require("../config/DB");
const Allowance = db.Allowance;
 
exports.AddAllowance =  (req, res) => {
 const allowanceObj = {

    responsilbityBonus: req.body.responsilbityBonus,
    housingBonus: req.body.housingBonus,
    transportationBonus: req.body.transportationBonus,
    fundAllowances:req.body.fundAllowances,


    electricityBonus: req.body.electricityBonus,
    indexSalary: req.body.indexSalary,
    shorttermLoans: req.body.shorttermLoans,
    miscellaneousAllowances:req.body.miscellaneousAllowances,


     
    domesticityBonus: req.body.domesticityBonus,
    extraHours: req.body.extraHours,
    numberOfHoursOfAbsence: req.body.numberOfHoursOfAbsence,
    numberOfDaysAbsence:req.body.numberOfDaysAbsence,
    isactive: req.body.isactive,

    //FK keys 
    departmentId:req.body.departmentId,
    positionId: req.body.positionId,

    };
 
    console.log(allowanceObj)
    Allowance.create(allowanceObj
    ).then(data => res.status(201).json({
            message: 'New Allowance has been added.',
            data:data
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

exports.getAllowances= async (req, res) => {
   await Allowance.findAll({})
        .then(data => res.json({
            data: data,
            message: ' details of All allowances'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
  

exports.getAllowanceById = async (req, res) => {
    await Allowance.findAll({where  : {AllowanceId:req.params.AllowanceId}})
         .then(data => res.json({
             data: data,
             message: ' details of allowance by Id'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
 };
   
   