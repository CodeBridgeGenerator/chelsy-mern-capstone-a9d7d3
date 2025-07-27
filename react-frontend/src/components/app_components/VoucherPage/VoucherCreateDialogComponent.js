import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const VoucherCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.CategoryId)) {
                error["CategoryId"] = `CategoryId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Title)) {
                error["Title"] = `Title field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Image)) {
                error["Image"] = `Image field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Description)) {
                error["Description"] = `Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.TermsAndCondition)) {
                error["TermsAndCondition"] = `TermsAndCondition field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            Id: _entity?.Id,CategoryId: _entity?.CategoryId,Points: _entity?.Points,Title: _entity?.Title,Image: _entity?.Image,Description: _entity?.Description,TermsAndCondition: _entity?.TermsAndCondition,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("voucher").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Voucher created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Voucher" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Voucher" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="voucher-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Id">Id:</label>
                <InputText id="Id" className="w-full mb-3 p-inputtext-sm" value={_entity?.Id} onChange={(e) => setValByKey("Id", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Id"]) ? (
              <p className="m-0" key="error-Id">
                {error["Id"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="CategoryId">CategoryId:</label>
                <InputText id="CategoryId" className="w-full mb-3 p-inputtext-sm" value={_entity?.CategoryId} onChange={(e) => setValByKey("CategoryId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["CategoryId"]) ? (
              <p className="m-0" key="error-CategoryId">
                {error["CategoryId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Points">Points:</label>
                <InputNumber id="Points" className="w-full mb-3 p-inputtext-sm" value={_entity?.Points} onChange={(e) => setValByKey("Points", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Points"]) ? (
              <p className="m-0" key="error-Points">
                {error["Points"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Title">Title:</label>
                <InputText id="Title" className="w-full mb-3 p-inputtext-sm" value={_entity?.Title} onChange={(e) => setValByKey("Title", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Title"]) ? (
              <p className="m-0" key="error-Title">
                {error["Title"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Image">Image:</label>
                <InputText id="Image" className="w-full mb-3 p-inputtext-sm" value={_entity?.Image} onChange={(e) => setValByKey("Image", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Image"]) ? (
              <p className="m-0" key="error-Image">
                {error["Image"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Description">Description:</label>
                <InputText id="Description" className="w-full mb-3 p-inputtext-sm" value={_entity?.Description} onChange={(e) => setValByKey("Description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Description"]) ? (
              <p className="m-0" key="error-Description">
                {error["Description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="TermsAndCondition">TermsAndCondition:</label>
                <InputTextarea id="TermsAndCondition" rows={5} cols={30} value={_entity?.TermsAndCondition} onChange={ (e) => setValByKey("TermsAndCondition", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["TermsAndCondition"]) ? (
              <p className="m-0" key="error-TermsAndCondition">
                {error["TermsAndCondition"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(VoucherCreateDialogComponent);
