import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


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

const CartItemHistoryCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.Id)) {
                error["Id"] = `Id field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.VoucherId)) {
                error["VoucherId"] = `VoucherId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.UserId)) {
                error["UserId"] = `UserId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.Quantity)) {
                error["Quantity"] = `Quantity field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.CompletedDate)) {
                error["CompletedDate"] = `CompletedDate field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            Id: _entity?.Id,VoucherId: _entity?.VoucherId,UserId: _entity?.UserId,Quantity: _entity?.Quantity,CompletedDate: _entity?.CompletedDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("cartItemHistory").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info CartItemHistory created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in CartItemHistory" });
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
        <Dialog header="Create CartItemHistory" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cartItemHistory-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Id">Id:</label>
                <InputText id="Id" className="w-full mb-3 p-inputtext-sm" value={_entity?.Id} onChange={(e) => setValByKey("Id", e.target.value)}  required  />
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
                <label htmlFor="VoucherId">VoucherId:</label>
                <InputText id="VoucherId" className="w-full mb-3 p-inputtext-sm" value={_entity?.VoucherId} onChange={(e) => setValByKey("VoucherId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["VoucherId"]) ? (
              <p className="m-0" key="error-VoucherId">
                {error["VoucherId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="UserId">UserId:</label>
                <InputText id="UserId" className="w-full mb-3 p-inputtext-sm" value={_entity?.UserId} onChange={(e) => setValByKey("UserId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["UserId"]) ? (
              <p className="m-0" key="error-UserId">
                {error["UserId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Quantity">Quantity:</label>
                <InputText id="Quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.Quantity} onChange={(e) => setValByKey("Quantity", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Quantity"]) ? (
              <p className="m-0" key="error-Quantity">
                {error["Quantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="CompletedDate">CompletedDate:</label>
                <InputText id="CompletedDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.CompletedDate} onChange={(e) => setValByKey("CompletedDate", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["CompletedDate"]) ? (
              <p className="m-0" key="error-CompletedDate">
                {error["CompletedDate"]}
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

export default connect(mapState, mapDispatch)(CartItemHistoryCreateDialogComponent);
