const Service=require('servicenow-rest-api');

const connection = require('./mysqlconnection');
const express = require("express");

const SNInstance = 'dev77887';
const SNUserName='admin';
const SNPassword='Tami1nadu!'

const ServiceNow=new Service(SNInstance,SNUserName,SNPassword);


ServiceNow.Authenticate((res)=>{
    console.log(res);
    });
    
    ServiceNow.getSampleData('incident',(res)=>{    // 
        console.log(res);
    });
    const fields=[
        'number',
        'requested_for',        
        'short_description',
        'priority',
        'state',
        'assignment_group',
        'assigned_to',
        'task_type',
        'active',
        'company',
        'contact_type',
        'opened_at',
        'opened_by',
        'time_worked',
        'closed_at',
        'closed_by',
        'configuration_item'
               
    ];
    
    const filters=[
        'priority=2'
    ];
    
    var results=[];
    var values;
    ServiceNow.getTableData(fields,filters,'incident',function(res){
         //console.log (res)

        for(let r of res){
            
           var ob = new Object();
           ob.number=r.number;
           ob.requestedfor = '';
           ob.shortdescription = r.short_description;
           ob.priority = r.priority;
           ob.state = r.state;
           if(r.assignment_group =='') ob.assignmentgroup = ''; else ob.assignmentgroup = r.assignment_group.display_value;         
           if(r.assigned_to =='') ob.assignto = ''; else ob.assignto = r.assigned_to.display_value;
           ob.tasktype ='Incident';
           ob.active = r.active;
           if(r.company =='') ob.company = ''; else ob.company = r.company.display_value;
           ob.contacttype=r.contact_type;
           ob.opened = r.opened_at;          
           if(r.opened_by =='') ob.openedby = ''; else ob.openedby = r.opened_by.display_value;   
           ob.timeworked = r.time_worked;    
           ob.closed = r.closed_at;           
           ob.closedby=r.closed_by;
           ob.configurationitem ='';
         

           results.push(ob);
        }
        console.log(results);
        // connection.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
         
           
              var sql = "INSERT INTO tickets (number,requestedFor, shortdescription,priority,state,assignmentGroup,assignedTo,taskType,active,company,contactType,opened,openedBy,timeWorked,closed,closedBy,configurationItem) VALUES ?";
           
            connection.query(sql, [values], function (err, result) {
              if (err) throw err;
              console.log("Number of records inserted: " + result.affectedRows);
            });
         // });
        
    });

   