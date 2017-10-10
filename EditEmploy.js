import React, { Component } from 'react';
import { ApiUrl } from '.././Config';
import $ from 'jquery';
import Select from 'react-select';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { Link } from 'react-router-dom';
import './EditEmploy.css';
import { toast } from 'react-toastify';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';

var validate = require('validate.js');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var FileInput = require('react-file-input');


class EditEmploy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Employ: null, Employ_Id: 0,
            Country: {}, Countries: [],
            State: {}, States: [],
            City: {}, Cities: [],
            Hobbies: [], errors: {},
            firstName: null, lastName: null, email: null, dob: null, phoneNumber: null,
            pan: null, address: null, Resume: null, Description: null,
            hobby: [], uploadVisible: false, Designation: {}, Designations: [],
            Manager: {}, Managers: [],
            Departments: [], Department: {}, managerVisible: false
        }
    }

    componentWillMount() {
        this.setState({ Employ_Id: this.props.match.params["id"] });



        //   let url=ApiUrl + "/api/Edit/getEmploy?empId"+this.props.match.params["id"]
        //    MyAjax(
        //         url,
        //     (data) => {
        //         this.setState({
        //                 Employ: data["employ"],
        //                 Hobbies: data["employ"]["Hobbies"].split(',')
        //             }, () => {
        //             this.createObjectsForSelect();
        //             setUnTouched(document);
        //         });
        //     },
        //     (error) => toast(error.responseText, {
        //         type: toast.TYPE.ERROR
        //     }),
        //     "GET",
        //     null
        //     );

        $.ajax({
            url: ApiUrl + "/api/Edit/getEmploy?empId=" + this.props.match.params["id"],
            type: "GET",
            success: (data) => {
                data["employ"]["DOB"] = moment(data["employ"]["DOB"]).format("YYYY-MM-DD");

                this.setState({
                    Employ: data["employ"],
                    Hobbies: data["employ"]["Hobbies"].split(',')
                },
                    () => {
                        this.createObjectsForSelect();
                    })
            }
        })

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetCountries",
            success: (data) => { this.setState({ Countries: data["countries"], Departments: data["departments"], Designations: data["designations"] }) },
            error: (error) => toast(error.responseText, {
                type: toast.TYPE.ERROR
            })
        })
    }

    componentDidMount() {
        setUnTouched(document);
        $('[data-toggle="popover"]').popover();
    }

    createObjectsForSelect() {
        if (this.state.Employ["Country_Id"]) {
            this.CountryChanged({ value: this.state.Employ["Country_Id"], label: this.state.Employ["Country"] });
            this.StateChanged({ value: this.state.Employ["State_Id"], label: this.state.Employ["State"] });
            this.CityChanged({ value: this.state.Employ["City_Id"], label: this.state.Employ["City"] });
        }
        this.DeptChanged({ value: this.state.Employ["Dept_Id"], label: this.state.Employ["Department"] });
        this.DesignationChanged({ value: this.state.Employ["Designaition_Id"], label: this.state.Employ["Designation"] });


        if (this.state.Employ["Designaition_Id"] == 1) {
            this.setState({ managerVisible: true }, () => {
                this.ManagerChanged({ value: this.state.Employ["ManagerId"], label: this.state.Employ["Manager"] });
            })

        }
        else {
            this.setState({ managerVisible: false })
        }

        if (this.state.Employ["Hobbies"]) {
            var hobbylist = this.state.Employ["Hobbies"].split(",");
        }

        setUnTouched(document);
    }
     
    render() {
               
        return (
                  
            this.state.Employ ?

                <div className="col-xs-12">

                    <div className="row">
                        <div className="col-xs-12">
                            <h3 className="col-md-11 myheading">Employee Updation Form</h3>
                        </div>
                    </div>
                    <hr />
                    <form className="regform" onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)}>

                        <div className="col-sm-12">
                            <div className="col-sm-3 form-group">
                                <label>First Name</label>
                                <input className="form-control" ref="firstName" name="FirstName" defaultValue={this.state.Employ["FirstName"]} />
                            </div>

                            <div className="col-sm-3 form-group">
                                <label>Last Name</label>
                                <input className="form-control" ref="lastName" name="LastName" defaultValue={this.state.Employ["LastName"]} />
                            </div>

                            <div className="col-sm-3 form-group">
                                <label className="gender">Gender </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="radio-inline" ref="gender">
                                            <label>
                                                <input type="radio" name="gender" value="Male" defaultChecked={this.state.Employ["Gender"] === "Male"} /> Male
                                        </label>
                                        </div>
                                        <div className="radio-inline">
                                            <label>
                                                <input type="radio" name="gender" value="Female" defaultChecked={this.state.Employ["Gender"] === "Female"} /> Female
                                    </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3 form-group">
                                <label>Date Of Birth</label>
                                {/* <DatePicker className="form-control" name="dob" ref="dob" selected={this.state.dob} dateFormat="DD-MM-YYYY" onChange={(val) => this.setState({ dob: val })} /> */}
                                <input className="form-control" type="date" ref="dob" name="DateOfBirth" defaultValue={this.state.Employ["DOB"]} />
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="col-sm-3 form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" ref="email" name="email" defaultValue={this.state.Employ["EmailId"]} />
                            </div>

                            <div className="col-sm-3 form-group">
                                <label>Phone Number </label>
                                <input className="form-control" type="text" ref="phoneNumber" name="PhoneNumber" defaultValue={this.state.Employ["PhoneNumber"]} />
                            </div>

                            <div className="col-sm-3 form-group">
                                <label>PAN Number</label>
                                <input className="form-control" ref="pan" type="text" name="pan" defaultValue={this.state.Employ["Pan"]} />
                            </div>

                            <div className="col-sm-3 form-group">
                                <label> Department</label>
                                <Select className="form-control" name="Department" ref="department" placeholder="Department" value={this.state.Department} options={this.state.Departments} onChange={this.DeptChanged.bind(this)} />
                            </div>
                        </div>
                         

                        < div className="col-xs-12">
                            <h3>Address Details</h3>
                            <hr />
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group" >
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </span>
                                    <textarea className="form-control myaddress" type="text" ref="address" placeholder="Address" name="Address" ref="Address" autoComplete="off" defaultValue={this.state.Employ["Address"]} />
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
                                <label><Checkbox value="bicycling" defaultChecked={this.state.Employ["Hobbies"] === "bicycling"} />Bicycling</label>
                            </CheckboxGroup>
                        </div>


                        <div className="col-sm-3 form-group">
                            <a href={this.state.Employ["Resume"]}> Previous Resume </a>
                            <a onClick={this.handleClick.bind(this)}>  New Resume  </a>
                            {
                                this.state.uploadVisible ?
                                    <div className="form-group">
                                        <div className="form-group">
                                            <input className="form-control" id="upload" ref="resume" name="resume" type="file" accept=".doc,.docx,.pdf" required />
                                        </div>
                                    </div>
                                    : null
                            }
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
                                <textarea className="form-control mytext" ref="Description" name="Description" maxLength="1000" defaultValue={this.state.Employ["ProjectDesc"]} />
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <Link to="/ViewEmployees"> <button className="btn btn-primary mybutton"> Back </button> </Link><span />
                            <button type="submit" name="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
                :
                <div />
        );
    }
    handleClick() {
        this.setState({ uploadVisible: !this.state.uploadVisible });
    }

    CountryChanged(val) {
        this.setState({ Country: val }, () => {
            if (this.state.Country && this.state.Country.value) {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetStates?countryId=" + this.state.Country.value,
                    success: (data) => { this.setState({ States: data["states"] }) },
                    error: (error) => toast(error.responseText, {
                        type: toast.TYPE.ERROR
                    })
                })
                showErrorsForInput(this.refs.country.wrapper, null);
            }
            else {
                this.setState({ States: [], State: null });
                this.setState({ Cities: [], City: null });
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
                    success: (data) => { this.setState({ Cities: data["cities"] }) },
                    error: (error) => toast(error.responseText, {
                        type: toast.TYPE.ERROR
                    })
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
        // if(this.state.Cities && this.state.City.value)
        //  {
        //     showErrorsForInput(this.refs.city.wrapper, null);
        // }
        // else {
        //     showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
        // }
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

    getManagers(val) {
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetManager?desgId=" + this.state.Designation.value,
            success: (data) => { this.setState({ Managers: data["managers"] }) }
        })
    }

    ManagerChanged(val) {
        this.setState({ Manager: val || '' })
    }



    handleSubmit(e) {

        e.preventDefault();
        toast.dismiss();

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

        data.append("Id", this.state.Employ["Id"]);
        data.append("FirstName", this.refs.firstName.value.trim());
        data.append("LastName", this.refs.lastName.value.trim());
        data.append("Gender", $("input[name='gender']:checked").val());
        data.append("DOB", this.refs.dob.value);
        data.append("EmailId", this.refs.email.value);
        data.append("PhoneNumber", this.refs.phoneNumber.value);
        data.append("PAN", this.refs.pan.value);
        data.append("Dept_Id", this.state.Department.value);
        data.append("EmpAddress", this.refs.Address.value.trim());
        data.append("Country_Id", this.state.Country.value);
        data.append("State_Id", this.state.State.value);
        data.append("City_Id", this.state.City.value);
        data.append("Hobbies", this.state.Hobbies);
        data.append("Designation_Id", this.state.Designation.value);
        data.append("Managers_Id", this.state.Manager.value);

        if (this.state.uploadVisible) {
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
        }

        data.append("ProjectDescription", this.refs.Description.value.trim());

        $(".loader").css("display", "inline-block");
        $("button[name='submit']").hide();

        let url = ApiUrl + "/api/Edit/EditEmploy";

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Details updated succesfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $(".loader").hide();
                    $("button[name='submit']").show();
                    this.props.history.push("/ViewEmployees");
                    return true;
                },
                (error) => {
                    toast("An error occoured, please try again!", {
                        type: toast.TYPE.ERROR
                    });
                    $(".loader").hide();
                    $("button[name='submit']").show();
                    return false;
                },
                "POST",
                data
            )
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
        //     url,
        //     type: "POST",
        //     data,
        //     contentType: false,
        //     processData: false
        // });

    }



    validate(e) {

        let fields = this.state.fields;
        let IsError = false;
        let errors = {};
        var success = ValidateForm(e);


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
            showErrorsForInput(this.refs.department.wrapper, ["Please select a valid department"]);
        }
        return success;
    }

}

export default EditEmploy