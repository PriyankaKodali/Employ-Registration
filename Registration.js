import React, { Component } from 'react';
import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import 'bootstrap/dist/css/bootstrap.css';
import './Registration.css';
import $ from 'jquery';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { ApiUrl } from '.././Config';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ViewEmployees from '../ViewEmployees/ViewEmployees';
import { MyAjaxForAttachments, MyAjax } from './../MyAjax';

var validate = require('validate.js');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var FileInput = require('react-file-input');
// var Select = require('react-select');


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Country: {}, Countries: [],
            State: {}, States: [],
            City: {}, Cities: [],
            Department: {}, Departments: [],
            Designation: {}, Designations: [], Managers: [], Manager: {},
            Hobbies: [], errors: {},
            firstName: null, lastName: null, email: null, dob: null, phoneNumber: null,
            pan: null, address: null, resume: null, description: null, managerVisible: false
        }
    }

    componentWillMount() {
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetAllData",
            type: "get",
            success: (data) => { this.setState({ Countries: data["countries"], Departments: data["departments"],  Designations: data["designations"] }) }
        })
    }

    componentDidMount() {
        setUnTouched(document);
        $('[data-toggle="popover"]').popover();
    }

    componentDidUpdate() {
        $('[data-toggle="popover"]').popover();
    }



    render() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="col-md-11 myheading">Employee Registration Form</h3>
                    </div>
                </div>
                <hr />

                <form className="regform" onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)} >

                    <div className="col-sm-12">
                        <div className="col-sm-3 form-group">
                            <label>First Name</label>
                            <input className="form-control" ref="firstName" type="text" name="FirstName" />
                        </div>

                        <div className="col-sm-3 form-group">
                            <label>Last Name</label>
                            <input className="form-control" type="text" ref="lastName" name="LastName" />
                        </div>

                        <div className="col-sm-3 form-group">
                            <label className="gender">Gender </label>
                            <div className="form-group">
                                <div className="input-group" >
                                    <div className="radio-inline" ref="gender" >
                                        <label>
                                            <input type="radio" name="gender" value="Male" /> Male
                                        </label>
                                    </div>
                                    <div className="radio-inline">
                                        <label>
                                            <input type="radio" name="gender" value="Female" /> Female
                                    </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3 form-group">
                            <label>Date Of Birth</label>
                            {/* <DatePicker className="form-control" name="dob" ref="dob" selected={this.state.dob} dateFormat="DD-MM-YYYY" onChange={(val) => this.setState({ dob: val })} /> */}
                            <input className="form-control" type="date" ref="dob" name="DateOfBirth" />
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <div className="col-sm-3 form-group">
                            <label>Email</label>
                            <input className="form-control" type="text" ref="email" name="email" />
                        </div>

                        <div className="col-sm-3 form-group">
                            <label>Phone Number </label>
                            <input className="form-control" type="text" ref="phoneNumber" name="PhoneNumber" />
                        </div>

                        <div className="col-sm-3 form-group">
                            <label>PAN Number</label>
                            <input className="form-control" ref="pan" type="text" name="pan" />
                        </div>

                        <div className="col-sm-3 form-group">
                            <label> Department</label>
                            <Select className="form-control" name="Department" ref="department" placeholder="Department" value={this.state.Department} options={this.state.Departments} onChange={this.DeptChanged.bind(this)} />
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <h3>Address Details</h3>
                        <hr />
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group" >
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </span>
                                <textarea className="form-control myaddress" type="text" ref="address" placeholder="Address" name="Address" ref="Address" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="col-sm-4 form-group">
                            <label> Country </label>
                            <Select className="form-control" name="country" ref="country" placeholder="Select Country" value={this.state.Country} options={this.state.Countries} onChange={this.CountryChanged.bind(this)} />
                        </div>

                        <div className="col-sm-4 form-group">
                            <label> State </label>
                            <Select className="form-control" name="State" ref="state" placeholder="Select State" value={this.state.State} options={this.state.States} onChange={this.StateChanged.bind(this)} />
                        </div>

                        <div className="col-sm-4 form-group">
                            <label> City </label>
                            <Select className="form-control" name="City" ref="city" placeholder="City" value={this.state.City} options={this.state.Cities} onChange={this.CityChanged.bind(this)} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <hr />
                    </div>
                    <div className="col-sm-3 form-group">
                        <label>Hobbies</label>
                        <CheckboxGroup ref="hobby"
                            name="hobby"
                            value={this.state.Hobbies}
                            onChange={this.hobbiesChanged}>

                            <label><Checkbox value="singing" />Singing </label>
                            <label><Checkbox value="tennis" />Tennis </label>
                            <label><Checkbox value="bicycling" />Bicycling</label>
                        </CheckboxGroup>
                    </div>

                    <div className="col-sm-3 form-group">
                        <label> Resume</label>
                        <div className="form-group">
                            <input className="form-control" id="upload" ref="resume" name="resume" type="file" accept=".doc,.docx,.pdf" /></div>
                    </div>

                    <div className="col-sm-3 form-group">
                        <label>Designation </label>
                        <Select className="form-control" name="designation" ref="designation" value={this.state.Designation} options={this.state.Designations} onChange={this.DesignationChanged.bind(this)} />
                    </div>
                    <div className="col-sm-3 form-group">
                        {
                            this.state.managerVisible ?
                                <div>
                                    <label>Manager </label>
                                    <Select className="form-control" name="manager" ref="manager" value={this.state.Manager} options={this.state.Managers} onChange={this.ManagerChanged.bind(this)} /></div>
                                : <div />
                        }

                    </div>

                    <div className="col-xs-12">
                        <h3>Project Descrption</h3>
                        <hr />
                        <div className="form-group form-group-textarea">
                            <textarea className="form-control mytext" ref="Description" name="Description" maxLength="1000" />
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <button type="submit" name="submit" className="btn btn-primary mybutton">Submit</button>  <span /> <span />
                        <button type="submit" name="view" className="btn btn-primary" onClick={() => this.props.history.push("/ViewEmployees")}>View All</button>
                    </div>
                </form>
            </div>
        );
    }


    CountryChanged(val) {
        this.setState({ Country: val }, () => {
            if (this.state.Country && this.state.Country.value) {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetStates?countryId=" + this.state.Country.value,
                    success: (data) => { this.setState({ States: data["states"] }) }
                })
                showErrorsForInput(this.refs.country.wrapper, null);
            }
            else {
                this.setState({ States: [], State: null });
                // this.setState({ Cities: [], City: null });
                showErrorsForInput(this.refs.country.wrapper, ["Please select a valid country"]);
                showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
                showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
            }
        });
    }

    StateChanged(val) {
        this.setState({ State: val }, () => {
            if (this.state.State && this.state.State.value) {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetCities?stateId=" + this.state.State.value,
                    success: (data) => { this.setState({ Cities: data["cities"] }) }
                })
                showErrorsForInput(this.refs.state.wrapper, null);
            }
            else {
                this.setState({ Cities: [], City: null });
                showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
                showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
            }
        });
    }

    
    CityChanged(val) {
        this.setState({ City: val || '' })
    }

    hobbiesChanged = (hobby) => {
        this.setState({
            Hobbies: hobby
        });
    }

    DeptChanged(val) {
        this.setState({ Department: val || '' })
    }
    DesignationChanged(val) {
        this.setState({ Designation: val || '' }, () => {
            if (this.state.Designation.value == 1) {
                this.setState({ managerVisible: true });
                this.getManagers();
            }
            else {
                this.setState({ managerVisible: false });
            }
        });
    }

    getManagers(val)
    {
        $.ajax({
            url: ApiUrl+"/api/MasterData/GetManager?desgId="+this.state.Designation.value,
            success:(data)=>{this.setState({Managers:data["managers"]})}
        })
    }
 
    ManagerChanged(val) {
        this.setState({ Manager: val || '' })
    }

    handleSubmit(e) {
        e.preventDefault();

        $(e.currentTarget.getElementsByClassName('form-control')).map((i, ele) => {
            ele.classList.remove("un-touched");
            return null;
        })

        if (!this.validate(e)) {
            return;
        }

        var inputs = $(e.currentTarget.getElementsByClassName('form-control')).map((i, el) => {
            if (el.closest(".form-group").classList.contains("hidden")) {
                return null;
            }
            else {
                return el;
            }
        });

        var data = new FormData();
        data.append("FirstName", this.refs.firstName.value);
        data.append("LastName", this.refs.lastName.value);
        data.append("Gender", $("input[name='gender']:checked").val());
        data.append("DOB", this.refs.dob.value);
        data.append("EmailId", this.refs.email.value);
        data.append("PhoneNumber", this.refs.phoneNumber.value);
        data.append("PAN", this.refs.pan.value);
        data.append("Dept_Id", this.state.Department.value);
        data.append("EmpAddress", this.refs.Address.value);
        data.append("Country_Id", this.state.Country.value);
        data.append("State_Id", this.state.State.value);
        data.append("City_Id", this.state.City.value);
        data.append("Hobbies", this.state.Hobbies);
        data.append("Designation_Id", this.state.Designation.value);
        data.append("Managers_Id", this.state.Manager.value);

        var file = this.refs.resume.files;
        if (file.length == 1) {
            if ($.inArray(this.refs.resume.value.split('.').pop().toLowerCase(), ["doc", "docx", "pdf", "txt"]) == -1) {
                showErrorsForInput(this.refs.resume, ["Supported formats : doc | docx | pdf | txt"]);
                return;
            }
            else {
                showErrorsForInput(this.refs.resume, null);
            }
            data.append("EmpResume", file[0]);
        }
       // data.append("Manager", this.refs.manager.value);
        data.append("ProjectDescription", this.refs.Description.value.trim());


        let url = ApiUrl + "/api/Employ/AddEmploy";

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Employ registered successfully!", {
                        type: toast.TYPE.SUCCESS
                    });

                    $("button[name='submit']").show();
                    this.props.history.push("/ViewEmployees");
                    return true;
                },
                (error) => {
                    toast("An error occoured, please try again!", {
                        type: toast.TYPE.ERROR,
                        autoClose: false
                    });
                    $(".loader").hide();
                    $("button[name='submit']").show();
                    return false;
                },
                "POST",
                data
            );
        }
        catch (e) {
            toast("An error occoured, please try again!", {
                type: toast.TYPE.ERROR
            });
            $(".loader").hide();
            $("button[name='submit']").show();
            return false;
        }

        // $.ajax({
        //      url,
        //      type:"POST",
        //      data,
        //      contentType:false,
        //      processData: false
        // });


    }

    validate(e) {

        let fields = this.state.fields;
        let IsError = false;
        let errors = {};
        var success = ValidateForm(e);

        // // if (!this.state.firstname) {
        // //     success = false;
        // //     showErrorsForInput(this.refs.firstname, ["Please enter valid name"]);
        // // }
        // // validate.single(this.state.firstname.value, { format: { pattern: "/^[a-zA-Z]+$/", message: "Enter valid name" }})

        if (!this.state.Country || !this.state.Country.value) {
            success = false;
            showErrorsForInput(this.refs.country.wrapper, ["Please select a valid country"]);
        }
        if (!this.state.State || !this.state.State.value) {
            success = false;
            showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
        }
        if (!this.state.City || !this.state.City.value) {
            success = false;
            showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
        }
        if (!this.state.Department || !this.state.Department.value) {
            success = false;
            showErrorsForInput(this.refs.department.wrapper, ["Please select department"]);
        }
        if (!this.state.Designation || !this.state.Designation.value) {
            success = false;
            showErrorsForInput(this.refs.designation.wrapper, ["Please select designation"]);
        }
        if(this.state.Designation.value==1)
            {
                if(!this.state.Manager|| !this.state.Manager.value)
                    {
                        success=false;
                        showErrorsForInput(this.refs.managers.wraper,["Please select your manager"]);
                    }
            }

        return success;
    }
}

export default Registration;
