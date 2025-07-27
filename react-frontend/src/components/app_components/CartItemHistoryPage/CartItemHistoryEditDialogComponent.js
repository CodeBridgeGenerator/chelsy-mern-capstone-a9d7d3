import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CartItemHistoryCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            Id: _entity?.Id,
VoucherId: _entity?.VoucherId,
UserId: _entity?.UserId,
Quantity: _entity?.Quantity,
CompletedDate: _entity?.CompletedDate,
        };

        setLoading(true);
        try {
            
        const result = await client.service("cartItemHistory").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info cartItemHistory updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit CartItemHistory" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cartItemHistory-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Id">Id:</label>
                <InputText id="Id" className="w-full mb-3 p-inputtext-sm" value={_entity?.Id} onChange={(e) => setValByKey("Id", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Id"]) && (
              <p className="m-0" key="error-Id">
                {error["Id"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="VoucherId">VoucherId:</label>
                <InputText id="VoucherId" className="w-full mb-3 p-inputtext-sm" value={_entity?.VoucherId} onChange={(e) => setValByKey("VoucherId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["VoucherId"]) && (
              <p className="m-0" key="error-VoucherId">
                {error["VoucherId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="UserId">UserId:</label>
                <InputText id="UserId" className="w-full mb-3 p-inputtext-sm" value={_entity?.UserId} onChange={(e) => setValByKey("UserId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["UserId"]) && (
              <p className="m-0" key="error-UserId">
                {error["UserId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Quantity">Quantity:</label>
                <InputText id="Quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.Quantity} onChange={(e) => setValByKey("Quantity", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Quantity"]) && (
              <p className="m-0" key="error-Quantity">
                {error["Quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="CompletedDate">CompletedDate:</label>
                <InputText id="CompletedDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.CompletedDate} onChange={(e) => setValByKey("CompletedDate", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["CompletedDate"]) && (
              <p className="m-0" key="error-CompletedDate">
                {error["CompletedDate"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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
