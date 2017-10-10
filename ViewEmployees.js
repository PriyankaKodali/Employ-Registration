import React, { Component } from 'react';
import $ from 'jquery';
 import '../index.css';
import { toast } from 'react-toastify';
import { ApiUrl } from '../Config';
import { MyAjax } from '../MyAjax';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var moment = require('moment');

class ViewEmployees extends Component{
    
        constructor(props)
        {
            super(props)
            this.state={
              Employ_Id:0,
              AllEmploys: [],  currentPage: 1, sizePerPage: 10, dataTotalSize: 0,
              IsDataAvailable: false
             }
        }

        componentWillMount(){
         this.getEmployees(1,10);
        }

        getEmployees(page,count)
        {
            this.setState({ IsDataAvailable: false });
             var url= ApiUrl + "/api/EmployView/ViewAllEmployees?page="+ page +"&count="+ count;
          $.ajax({
                 url,
                type:"GET",
                success: (data) => this.setState({ AllEmploys: data["employs"], dataTotalSize: data["totalRecords"], currentPage: page, sizePerPage: count, IsDataAvailable: true})
            })
        }

     render(){
        return(
           <div className="col-xs-12">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="col-md-11 myheading">All Employees</h3>
                    </div>
                </div>
                <hr />
                
                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                 <div>
                  <BootstrapTable data={this.state.AllEmploys} striped hover remote={true} pagination={true}
                                fetchInfo={{ dataTotalSize: this.state.dataTotalSize }}
                                options={{
                                    sizePerPage: this.state.sizePerPage,
                                    onPageChange: this.onPageChange.bind(this),
                                    sizePerPageList: [{ text: '10', value: 10 },
                                    { text: '25', value: 25 },
                                    { text: 'ALL', value: this.state.dataTotalSize }],
                                    page: this.state.currentPage,
                                    onSizePerPageList: this.onSizePerPageList.bind(this),
                                    paginationPosition: 'bottom'
                                }}
                            > 
                        <TableHeaderColumn dataField='EmpName' dataSort={true}> Name </TableHeaderColumn>
                        <TableHeaderColumn dataField='EmailId'  dataSort={true}> EmailId </TableHeaderColumn>
                        <TableHeaderColumn dataField='PhoneNum' dataSort={true}> Phone Number </TableHeaderColumn>
                        <TableHeaderColumn columnClassName="text-center" isKey={true} dataField='Edit' dataFormat={this.editEmpFormatter.bind(this)} width='35'></TableHeaderColumn>
                        <TableHeaderColumn columnClassName="text-center" dataField='Delete' dataFormat={this.deleteEmpFormatter.bind(this)} width='35'></TableHeaderColumn>
                    
                     </BootstrapTable>
                    </div>
                  }
                </div>
        );
    }

    editEmpFormatter(cell, row) {
        return <i className='glyphicon glyphicon-pencil' style={{ fontSize: '18px' }} onClick={()=>this.props.history.push("/EditEmploy/"+row["Id"])}></i>;
    }

    deleteEmpFormatter(cell,row){
        return <i className='glyphicon glyphicon-remove'  style={{ fontSize: '18px' }} onClick={()=>this.props.history.push("/DeleteEmploy/"+row["Id"])}></i>
    }

     onPageChange(page, sizePerPage) {
        this.getEmployees(page, sizePerPage);
    }

    onSizePerPageList(sizePerPage) {
        this.getEmployees(this.state.currentPage, sizePerPage);
    }
}

export default ViewEmployees;